// Registration form for Hibah Digital Difira 2026 on /hibah.
// Five steps; step 3 asks different questions for each category. Answers are posted to a
// Google Apps Script web app that appends a row to the campaign spreadsheet and returns the
// registration number (see scripts/hibah-apps-script.gs). Unsent answers stay in this browser
// as a draft. Campaign timing comes from app.js (window.difiraHibah).
//
// Testing without the spreadsheet: ?hibah_mock=1 fakes a successful submission and
// ?hibah_mock=fail a failed one. Combine with ?hibah_now=... to try other phases.
(function () {
  // Paste the web app URL from Apps Script (Deploy → New deployment → Web app) here.
  const HIBAH_ENDPOINT =
    'https://script.google.com/macros/s/AKfycbxxH5ar3NqAotzePd8xK7X1iVSO8QvbdiVC04-HzXGbOFMms1OtZdDpokHW9JaVnhxbGQ/exec';
  const DRAFT_KEY = 'difira-hibah-draft';
  const SHARE_URL = 'https://difira.studio/hibah/';

  const MSG = {
    required: 'Bagian ini wajib diisi.',
    min: n => `Mohon jelaskan lebih rinci, minimal ${n} karakter.`,
    wa: 'Nomor WhatsApp belum valid. Contoh: 0812 3456 7890.',
    email: 'Alamat email belum valid.',
    consent: 'Mohon centang persetujuan untuk melanjutkan.',
    failed:
      'Pendaftaran gagal terkirim. Periksa koneksi internet Anda, lalu coba kembali. Apabila masih gagal, hubungi kami melalui WhatsApp.',
  };

  const hibah = window.difiraHibah;
  const form = document.querySelector('#hibah-form');
  if (!form || !hibah) return;

  const panels = [...form.querySelectorAll('.brief-panel')];
  const progress = [...form.querySelectorAll('.brief-progress li')];
  const backButton = form.querySelector('[data-back]');
  const nextButton = form.querySelector('[data-next]');
  const submitButton = form.querySelector('[data-submit]');
  const submitLabel = form.querySelector('[data-submit-label]');
  const errorBox = form.querySelector('.brief-error');
  const done = document.querySelector('[data-hibah-done]');
  const closed = document.querySelector('[data-hibah-closed]');
  const info = document.querySelector('[data-hibah-info]');
  const mock = new URLSearchParams(window.location.search).get('hibah_mock');
  const startedAt = Date.now();
  let step = 0;
  let sending = false;

  // ---------- Hero line and the terms toggle ----------
  function renderInfo() {
    if (!info) return;
    const phase = hibah.phase();
    info.replaceChildren();
    if (phase === 'open') {
      const b = document.createElement('b');
      b.textContent = `${hibah.countdown('id')} lagi`;
      info.append('Pendaftaran ditutup Kamis, 5 November 2026 pukul 17.00 WIB · ', b);
    } else if (phase === 'upcoming') {
      info.append('Pendaftaran dibuka Kamis, 29 Oktober 2026 pukul 17.00 WIB');
    } else {
      info.append('Pendaftaran telah ditutup pada 5 November 2026 pukul 17.00 WIB.');
    }
  }
  renderInfo();
  setInterval(renderInfo, 60_000);

  document.querySelectorAll('[data-open-sk]').forEach(link =>
    link.addEventListener('click', () => {
      const sk = document.querySelector('[data-sk]');
      if (sk) sk.open = true;
    }),
  );

  // ---------- Closed or not yet open: the form is replaced by a message ----------
  function showClosed() {
    const phase = hibah.phase();
    form.hidden = true;
    closed.hidden = false;
    closed.querySelector('[data-closed-text="closed"]').hidden = phase === 'upcoming';
    closed.querySelector('[data-closed-text="upcoming"]').hidden = phase !== 'upcoming';
  }
  if (hibah.phase() !== 'open') {
    showClosed();
    return;
  }

  // ---------- Reading fields ----------
  const fields = [...form.querySelectorAll('[data-field]')];
  const inputsOf = field => [...field.querySelectorAll('input, textarea')];
  const isShown = el => !el.closest('[hidden]');
  const category = () => form.querySelector('input[name=kategori]:checked')?.value || '';

  function valueOf(field) {
    const inputs = inputsOf(field);
    switch (field.dataset.kind) {
      case 'radio':
        return inputs.find(i => i.checked)?.value || '';
      case 'checks':
        return inputs.filter(i => i.checked).map(i => i.value);
      case 'consent':
        return inputs[0].checked;
      default:
        return inputs[0].value.trim();
    }
  }

  function fieldError(field) {
    const value = valueOf(field);
    const required = field.hasAttribute('data-required');
    const kind = field.dataset.kind;
    if (kind === 'consent') return required && !value ? MSG.consent : '';
    const empty = Array.isArray(value) ? value.length === 0 : !value;
    if (empty) return required ? MSG.required : '';
    const min = Number(field.dataset.min || 0);
    if (min && value.length < min) return MSG.min(min);
    if (kind === 'wa') {
      const digits = value.replace(/\D/g, '');
      if (!/^(0|62)8/.test(digits) || digits.length < 10 || digits.length > 15) return MSG.wa;
    }
    if (kind === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value)) return MSG.email;
    if (kind === 'year') {
      const year = Number(value);
      if (!/^\d{4}$/.test(value) || year < 1900 || year > 2026) return MSG.required;
    }
    return '';
  }

  function setFieldError(field, message) {
    const box = field.querySelector('.field-error');
    box.textContent = message;
    box.hidden = !message;
    inputsOf(field).forEach(input => {
      if (message) input.setAttribute('aria-invalid', 'true');
      else input.removeAttribute('aria-invalid');
    });
  }

  /** Checks the visible fields of one step; shows every error and returns the first bad field. */
  function validateStep(index) {
    let first = null;
    fields
      .filter(f => panels[index].contains(f) && isShown(f))
      .forEach(field => {
        const message = fieldError(field);
        setFieldError(field, message);
        if (message && !first) first = field;
      });
    return first;
  }

  // ---------- Category-specific questions ----------
  function applyCategory() {
    const chosen = category();
    form.querySelectorAll('[data-for]').forEach(block => (block.hidden = block.dataset.for !== chosen));
  }

  // ---------- Steps ----------
  function goTo(index, { focus = true } = {}) {
    step = Math.max(0, Math.min(panels.length - 1, index));
    panels.forEach((panel, i) => panel.classList.toggle('is-current', i === step));
    progress.forEach((item, i) => {
      item.classList.toggle('is-current', i === step);
      item.classList.toggle('is-done', i < step);
    });
    backButton.hidden = step === 0;
    nextButton.hidden = step === panels.length - 1;
    submitButton.hidden = step !== panels.length - 1;
    errorBox.textContent = '';
    if (!focus) return;
    const top = form.getBoundingClientRect().top + window.scrollY - 110;
    if (Math.abs(window.scrollY - top) > 40) window.scrollTo({ top, behavior: 'smooth' });
    panels[step].querySelector('legend')?.setAttribute('tabindex', '-1');
    panels[step].querySelector('legend')?.focus({ preventScroll: true });
  }

  function focusField(field) {
    const target = inputsOf(field).find(i => i.type !== 'radio' || i.checked) || inputsOf(field)[0];
    target?.focus();
  }

  nextButton.addEventListener('click', () => {
    const bad = validateStep(step);
    if (bad) {
      focusField(bad);
      return;
    }
    goTo(step + 1);
  });
  backButton.addEventListener('click', () => goTo(step - 1));

  form.addEventListener('keydown', event => {
    if (event.key !== 'Enter' || event.target.tagName !== 'INPUT' || ['checkbox', 'radio'].includes(event.target.type)) return;
    if (step < panels.length - 1) {
      event.preventDefault();
      nextButton.click();
    }
  });

  form.addEventListener('change', event => {
    if (event.target.name === 'kategori') applyCategory();
  });
  form.addEventListener('input', event => {
    const field = event.target.closest('[data-field]');
    if (field && !field.querySelector('.field-error').hidden && !fieldError(field)) setFieldError(field, '');
    saveDraft();
  });

  // ---------- Draft (this browser only) ----------
  function saveDraft() {
    const data = {};
    fields.forEach(field => (data[field.dataset.field] = valueOf(field)));
    try {
      localStorage.setItem(DRAFT_KEY, JSON.stringify(data));
    } catch {
      /* storage unavailable: the draft lasts for this page view */
    }
  }

  function loadDraft() {
    let data;
    try {
      data = JSON.parse(localStorage.getItem(DRAFT_KEY) || 'null');
    } catch {
      return;
    }
    if (!data || typeof data !== 'object') return;
    fields.forEach(field => {
      const value = data[field.dataset.field];
      if (value === undefined) return;
      const inputs = inputsOf(field);
      switch (field.dataset.kind) {
        case 'radio':
          inputs.forEach(i => (i.checked = i.value === value));
          break;
        case 'checks':
          inputs.forEach(i => (i.checked = Array.isArray(value) && value.includes(i.value)));
          break;
        case 'consent':
          inputs[0].checked = value === true;
          break;
        default:
          if (typeof value === 'string') inputs[0].value = value;
      }
    });
  }

  function clearDraft() {
    try {
      localStorage.removeItem(DRAFT_KEY);
    } catch {
      /* nothing to clear */
    }
  }

  // ---------- Submit ----------
  function payload() {
    const data = { website_url: form.elements.website_url.value, elapsed_ms: Date.now() - startedAt };
    fields.filter(isShown).forEach(field => {
      const value = valueOf(field);
      data[field.dataset.field] = Array.isArray(value) ? value.join('; ') : value;
    });
    // The two eligibility statements share one column in the spreadsheet.
    data.kelayakan = Boolean(data.kelayakan_landing || data.kelayakan_aplikasi);
    delete data.kelayakan_landing;
    delete data.kelayakan_aplikasi;
    return data;
  }

  async function send(data) {
    if (mock === '1') {
      await new Promise(r => setTimeout(r, 700));
      return { ok: true, nomor: 'HDD-0001' };
    }
    if (mock === 'fail' || !HIBAH_ENDPOINT) {
      if (!HIBAH_ENDPOINT) console.warn('hibah.js: HIBAH_ENDPOINT is empty, so registrations cannot be sent.');
      throw new Error('no endpoint');
    }
    // A text/plain body keeps this a "simple" request, which Apps Script web apps accept cross-origin.
    const response = await fetch(HIBAH_ENDPOINT, {
      method: 'POST',
      body: JSON.stringify(data),
      signal: AbortSignal.timeout(30_000),
    });
    return response.json();
  }

  function showDone(nomor) {
    form.hidden = true;
    done.querySelector('[data-nomor]').textContent = nomor;
    done.hidden = false;
    done.focus();
    done.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }

  form.addEventListener('submit', async event => {
    event.preventDefault();
    if (sending) return;
    if (hibah.phase() !== 'open') {
      showClosed();
      return;
    }
    for (let i = 0; i < panels.length; i++) {
      const bad = validateStep(i);
      if (bad) {
        goTo(i, { focus: false });
        focusField(bad);
        return;
      }
    }
    const data = payload();
    // Honeypot: a person never sees this field, so anything in it came from a bot.
    if (data.website_url) {
      showDone('HDD-0000');
      return;
    }

    sending = true;
    submitButton.disabled = true;
    submitLabel.textContent = 'Mengirim…';
    errorBox.textContent = '';
    try {
      const result = await send(data);
      if (result?.ok && result.nomor) {
        clearDraft();
        showDone(result.nomor);
      } else if (result?.error === 'closed') {
        showClosed();
      } else {
        errorBox.textContent = MSG.failed;
      }
    } catch {
      errorBox.textContent = MSG.failed;
    } finally {
      sending = false;
      submitButton.disabled = false;
      submitLabel.textContent = 'Kirim pendaftaran';
    }
  });

  // ---------- Share ----------
  const shareButton = document.querySelector('[data-share]');
  const shareNote = document.querySelector('[data-share-note]');
  shareButton?.addEventListener('click', async () => {
    const data = { title: 'Hibah Digital Difira 2026', text: 'Website dan aplikasi gratis bagi usaha dan organisasi.', url: SHARE_URL };
    if (navigator.share) {
      try {
        await navigator.share(data);
      } catch {
        /* closed the share sheet */
      }
      return;
    }
    try {
      await navigator.clipboard.writeText(SHARE_URL);
      shareNote.textContent = `Tautan disalin: ${SHARE_URL}`;
    } catch {
      shareNote.textContent = SHARE_URL;
    }
    shareNote.hidden = false;
  });

  // If registration closes while the page is open, swap the form out at that moment.
  const untilClose = hibah.close - hibah.now();
  if (untilClose > 0 && untilClose < 2 ** 31 - 1) setTimeout(showClosed, untilClose);

  loadDraft();
  applyCategory();
  goTo(0, { focus: false });
})();
