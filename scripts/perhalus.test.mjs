// Tests for scripts/perhalus.mjs with a fake fetch: no network, no API key, no charges.
//   node --test scripts/perhalus.test.mjs
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { parseIdStrings, selectTexts, usedKeys, poles, applyPolished, PerhalusError } from './perhalus.mjs';

const SOURCE = `  const ID = {
    'nav.work': 'Karya',
    'hero.title': '<span class="line">Software yang bicara dari <em>hati.</em></span>',
    'faq.a1': 'Tergantung lingkupnya. Setelah ngobrol, kami kirim penawaran tertulis.',
    'about.p1': 'Difira Studio adalah software house dari PT Difira Karya Nusantara.',
    'quote': 'Kalau kamu penasaran, kirim pesan saja ke tim kami di Semarang, ya: it\\'s fine.',
  };`;

function fakeFetch(body, status = 200) {
  const calls = [];
  const impl = async (url, init) => {
    calls.push({ url, init });
    return { status, json: async () => body };
  };
  return { impl, calls };
}

test('parseIdStrings reads every entry, including escaped quotes', () => {
  const entries = parseIdStrings(SOURCE);
  assert.equal(entries.length, 5);
  assert.equal(entries.find(e => e.key === 'quote').text.endsWith("it's fine."), true);
});

test('selectTexts skips short strings and HTML, and honours --keys', () => {
  const entries = parseIdStrings(SOURCE);
  assert.deepEqual(selectTexts(entries).map(e => e.key), ['faq.a1', 'about.p1', 'quote']);
  assert.deepEqual(selectTexts(entries, { keys: ['faq.a1', 'nav.work'] }).map(e => e.key), ['faq.a1']);
});

test('usedKeys reads text, html and attribute keys, and selectTexts drops keys no page uses', () => {
  const used = usedKeys([
    '<p data-i18n="faq.a1">x</p><h1 data-i18n-html="hero.title">y</h1>',
    '<meta content="z" data-i18n-attr="content:about.p1, aria-label:nav.work" />',
  ]);
  assert.deepEqual([...used].sort(), ['about.p1', 'faq.a1', 'hero.title', 'nav.work']);
  assert.deepEqual(selectTexts(parseIdStrings(SOURCE), { used }).map(e => e.key), ['faq.a1', 'about.p1']);
});

test('selectTexts never sends URLs, even long ones without HTML', () => {
  const entries = [{ key: 'studio.wa.trial', text: 'https://wa.me/6287761021129?text=Halo%20Difira%20Studio%2C%20saya%20tertarik' }];
  assert.deepEqual(selectTexts(entries), []);
});

test('poles sends the documented request and returns result, cost and balance', async () => {
  const { impl, calls } = fakeFetch({
    ok: true,
    result: { score: 82, level: 'Slop', verdict: 'ai_like', summary: '…', polished: { text: 'Teks baru.', score: 14, level: 'Bersih', verdict: 'human_like', changes: [] } },
    cost: { total: 1273, model: 168, fira: 1105 },
    balanceIdr: 3727,
  });
  const out = await poles('Teks yang ingin dipoles agar terbaca lebih alami dan wajar.', { apiKey: 'ph_live_test', fetchImpl: impl });

  assert.equal(calls.length, 1);
  assert.equal(calls[0].url, 'https://perhalus.com/api/v1/poles');
  assert.equal(calls[0].init.method, 'POST');
  assert.equal(calls[0].init.headers.Authorization, 'Bearer ph_live_test');
  assert.deepEqual(JSON.parse(calls[0].init.body), { text: 'Teks yang ingin dipoles agar terbaca lebih alami dan wajar.', tone: 'netral', mode: 'poles' });
  assert.equal(out.result.polished.text, 'Teks baru.');
  assert.equal(out.cost.total, 1273);
  assert.equal(out.balanceIdr, 3727);
});

test('poles passes through a null polished result for text that already reads naturally', async () => {
  const { impl } = fakeFetch({ ok: true, result: { score: 9, level: 'Bersih', verdict: 'human_like', polished: null }, cost: { total: 400 }, balanceIdr: 100 });
  const out = await poles('Kalimat ini sudah wajar dan tidak perlu ditulis ulang sama sekali.', { apiKey: 'k', fetchImpl: impl });
  assert.equal(out.result.polished, null);
});

test('poles turns API errors into PerhalusError with the API code', async () => {
  const { impl } = fakeFetch({ ok: false, error: { code: 'insufficient_credits', message: 'Saldo tidak cukup.' } }, 402);
  await assert.rejects(poles('Teks apa saja yang cukup panjang untuk dikirim ke API.', { apiKey: 'k', fetchImpl: impl }), err => {
    assert.ok(err instanceof PerhalusError);
    assert.equal(err.code, 'insufficient_credits');
    return true;
  });
});

test('poles refuses to call the API without a key', async () => {
  const { impl, calls } = fakeFetch({ ok: true });
  await assert.rejects(poles('Teks', { apiKey: '', fetchImpl: impl }), { code: 'missing_key' });
  assert.equal(calls.length, 0);
});

test('applyPolished keeps every line break in a CRLF file', () => {
  const crlf = SOURCE.replace(/\n/g, '\r\n');
  const out = applyPolished(crlf, { 'faq.a1': 'Teks baru yang cukup panjang untuk menggantikan jawaban lama.' });
  assert.equal(out.split('\r\n').length, crlf.split('\r\n').length);
  assert.equal(parseIdStrings(out).length, 5);
});

test('applyPolished rewrites only the given keys and escapes quotes', () => {
  const out = applyPolished(SOURCE, { 'faq.a1': "Tergantung lingkupnya, ya. Kami kirim penawaran dulu, baru mulai: it's ok." });
  const entries = Object.fromEntries(parseIdStrings(out).map(e => [e.key, e.text]));
  assert.equal(entries['faq.a1'], "Tergantung lingkupnya, ya. Kami kirim penawaran dulu, baru mulai: it's ok.");
  assert.equal(entries['about.p1'], 'Difira Studio adalah software house dari PT Difira Karya Nusantara.');
  assert.equal(entries['nav.work'], 'Karya');
});
