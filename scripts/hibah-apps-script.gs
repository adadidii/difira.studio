/**
 * Hibah Digital Difira 2026: receives registrations from difirastudio.com/hibah and appends
 * them to this spreadsheet. Paste into Extensions → Apps Script of the spreadsheet, then
 * Deploy → New deployment → Web app (Execute as: Me, Who has access: Anyone). Put the
 * web app URL in HIBAH_ENDPOINT in hibah.js. Setup steps are in the repo README.
 *
 * Protection: registration window enforced here too, honeypot and minimum fill time,
 * required fields and length limits per category, WhatsApp/email format checks, a short
 * per-number cache against double submits, duplicate numbers flagged for review, and cell
 * values that would start a formula (=, +, -, @) are stored as plain text.
 */

const SHEET_NAME = 'Pendaftar';
const OPEN_AT = new Date('2026-10-29T13:45:00+07:00');
const CLOSE_AT = new Date('2026-11-05T17:00:00+07:00');
const MIN_FILL_MS = 20 * 1000;

const LANDING = 'Hibah Landing Page';
const APP = 'Hibah Aplikasi Operasional';

// [key, column title, max length, required for: 'all' | LANDING | APP | '', min length]
const FIELDS = [
  ['kategori', 'Kategori', 40, 'all', 0],
  ['kelayakan', 'Pernyataan kelayakan', 5, 'all', 0],
  ['nama_usaha', 'Nama usaha/organisasi', 120, 'all', 0],
  ['jenis', 'Jenis', 60, 'all', 0],
  ['bidang', 'Bidang kegiatan', 120, 'all', 0],
  ['kota', 'Kota/kabupaten', 120, 'all', 0],
  ['tahun_mulai', 'Tahun mulai', 4, 'all', 0],
  ['jumlah', 'Jumlah orang', 20, 'all', 0],
  ['medsos', 'Media sosial/marketplace', 300, '', 0],
  ['cerita', 'Cerita usaha', 2000, 'all', 50],
  ['tujuan', 'Tujuan website', 400, LANDING, 0],
  ['cara_ditemukan', 'Cara ditemukan saat ini', 2000, LANDING, 0],
  ['materi', 'Materi tersedia', 300, '', 0],
  ['proses', 'Proses yang dibantu', 2000, APP, 50],
  ['cara_sekarang', 'Proses saat ini', 2000, APP, 0],
  ['masalah', 'Masalah', 2000, APP, 0],
  ['pengguna', 'Pengguna aplikasi', 2000, APP, 0],
  ['fitur', 'Fitur penting', 2000, '', 0],
  ['alasan', 'Alasan butuh hibah', 2000, 'all', 100],
  ['harapan', 'Perubahan yang diharapkan', 2000, 'all', 50],
  ['instagram', 'Instagram usaha', 100, '', 0],
  ['nama_pic', 'Nama PIC', 120, 'all', 0],
  ['jabatan', 'Jabatan', 120, 'all', 0],
  ['wa', 'WhatsApp', 20, 'all', 0],
  ['email', 'Email', 120, 'all', 0],
  ['sumber', 'Sumber info', 40, '', 0],
  ['setuju_sk', 'Setuju S&K', 5, 'all', 0],
  ['setuju_portofolio', 'Setuju portofolio', 5, 'all', 0],
  ['setuju_wa', 'Setuju dihubungi WA', 5, 'all', 0],
  ['setuju_kontak_ulang', 'Boleh dihubungi lagi', 5, '', 0],
];
const HEADER = ['Nomor', 'Waktu (WIB)', 'Duplikat WA'].concat(FIELDS.map(f => f[1]));

function doPost(e) {
  try {
    const data = JSON.parse((e && e.postData && e.postData.contents) || '{}');
    const now = new Date();

    // Bots: answer like a success so they do not retry, but store nothing.
    if (data.website_url || Number(data.elapsed_ms) < MIN_FILL_MS) return json({ ok: true, nomor: 'HDD-0000' });
    if (now < OPEN_AT || now >= CLOSE_AT) return json({ ok: false, error: 'closed' });

    const clean = validate(data);
    if (!clean) return json({ ok: false, error: 'invalid' });

    const wa = String(clean.wa).replace(/\D/g, '').replace(/^0/, '62');
    const cache = CacheService.getScriptCache();
    const recent = cache.get('wa:' + wa);
    if (recent) return json({ ok: true, nomor: recent });

    const lock = LockService.getScriptLock();
    lock.waitLock(20000);
    try {
      const sheet = getSheet();
      const props = PropertiesService.getScriptProperties();
      const seq = Number(props.getProperty('seq') || '0') + 1;
      props.setProperty('seq', String(seq));
      const nomor = 'HDD-' + String(seq).padStart(4, '0');

      const waColumn = HEADER.indexOf('WhatsApp') + 1;
      const last = sheet.getLastRow();
      const existing = last > 1 ? sheet.getRange(2, waColumn, last - 1, 1).getValues().flat() : [];
      const duplicate = existing.some(v => String(v).replace(/\D/g, '').replace(/^0/, '62') === wa);

      const time = Utilities.formatDate(now, 'Asia/Jakarta', 'yyyy-MM-dd HH:mm:ss');
      const row = [nomor, time, duplicate ? 'Ya' : ''].concat(FIELDS.map(f => safe(clean[f[0]])));
      sheet.appendRow(row);
      cache.put('wa:' + wa, nomor, 600);
      return json({ ok: true, nomor: nomor });
    } finally {
      lock.releaseLock();
    }
  } catch (err) {
    console.error(err);
    return json({ ok: false, error: 'server' });
  }
}

function doGet() {
  return json({ ok: true, service: 'hibah-digital-difira-2026' });
}

/** Returns the cleaned record, or null when a required field is missing or malformed. */
function validate(data) {
  const category = String(data.kategori || '');
  if (category !== LANDING && category !== APP) return null;
  const out = {};
  for (const [key, , max, requiredFor, min] of FIELDS) {
    let value = data[key];
    if (typeof value === 'boolean') value = value ? 'Ya' : '';
    value = value == null ? '' : String(value).trim();
    if (value.length > max) return null;
    const required = requiredFor === 'all' || requiredFor === category;
    if (required && (!value || value === 'false')) return null;
    if (value && min && value.length < min) return null;
    out[key] = value === 'true' ? 'Ya' : value;
  }
  const digits = out.wa.replace(/\D/g, '');
  if (!/^(0|62)8/.test(digits) || digits.length < 10 || digits.length > 15) return null;
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(out.email)) return null;
  if (!/^\d{4}$/.test(out.tahun_mulai)) return null;
  return out;
}

/** Stops a submitted value from being read as a spreadsheet formula. */
function safe(value) {
  const text = String(value == null ? '' : value);
  return /^[=+\-@\t\r]/.test(text) ? "'" + text : text;
}

function getSheet() {
  const book = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = book.getSheetByName(SHEET_NAME) || book.insertSheet(SHEET_NAME);
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(HEADER);
    sheet.setFrozenRows(1);
    sheet.getRange(1, 1, 1, HEADER.length).setFontWeight('bold');
  }
  return sheet;
}

function json(body) {
  return ContentService.createTextOutput(JSON.stringify(body)).setMimeType(ContentService.MimeType.JSON);
}
