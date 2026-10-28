// Project brief on /mulai: a three-step form whose answers become a WhatsApp message.
// Nothing is sent to a server. The visitor checks the message in the preview, then the
// final button opens wa.me with the text filled in. Unsent answers are kept in this
// browser only, so a closed tab does not lose them.
(function () {
  const WA_NUMBER = '6287761021129';
  const DRAFT_KEY = 'difira-brief';

  const form = document.querySelector('#brief');
  if (!form) return;
  const panels = [...form.querySelectorAll('.brief-panel')];
  const progress = [...form.querySelectorAll('.brief-progress li')];
  const backButton = form.querySelector('[data-back]');
  const nextButton = form.querySelector('[data-next]');
  const submitButton = form.querySelector('[data-submit]');
  const errorBox = form.querySelector('.brief-error');
  const done = form.querySelector('.brief-done');
  const waLink = form.querySelector('[data-wa-link]');
  const preview = document.querySelector('[data-preview]');
  let step = 0;

  const TEXT = {
    en: {
      greeting: 'Hi Difira Studio, I would like to discuss a project.',
      needs: 'Needs',
      story: 'Situation',
      when: 'Timeline',
      budget: 'Budget',
      name: 'Name',
      business: 'Business',
      phone: 'WhatsApp',
      email: 'Email',
      empty: '…',
      errNeed: 'Choose at least one option.',
      errStory: 'Describe the situation in at least 20 characters.',
      errName: 'Enter your name.',
      errPhone: 'Enter a valid WhatsApp number, for example 0812 3456 7890.',
      errEmail: 'Check the email address, or leave it empty.',
    },
    id: {
      greeting: 'Halo Difira Studio, saya ingin mendiskusikan sebuah proyek.',
      needs: 'Kebutuhan',
      story: 'Situasi',
      when: 'Target waktu',
      budget: 'Anggaran',
      name: 'Nama',
      business: 'Usaha',
      phone: 'WhatsApp',
      email: 'Email',
      empty: '…',
      errNeed: 'Pilih minimal satu kebutuhan.',
      errStory: 'Jelaskan situasinya minimal 20 karakter.',
      errName: 'Isi nama Anda.',
      errPhone: 'Isi nomor WhatsApp yang valid, misalnya 0812 3456 7890.',
      errEmail: 'Periksa kembali alamat email, atau kosongkan saja.',
    },
  };
  const t = key => TEXT[document.documentElement.lang === 'id' ? 'id' : 'en'][key];

  // ---------- Reading answers ----------
  const field = name => form.elements[name];
  const value = name => (field(name)?.value || '').trim();
  const checkedLabel = input => {
    const label = input.closest('label');
    return (label.querySelector('.choice-text b') || label.querySelector('span')).textContent.trim();
  };

  function answers() {
    return {
      needs: [...form.querySelectorAll('input[name=need]:checked')].map(checkedLabel),
      story: value('story'),
      when: form.querySelector('input[name=when]:checked'),
      budget: form.querySelector('input[name=budget]:checked'),
      name: value('name'),
      business: value('business'),
      phone: value('phone'),
      email: value('email'),
    };
  }

  /** Message lines as [label, value] pairs; a null label is a plain line, null entirely is a blank line. */
  function messageLines(a) {
    const lines = [[null, t('greeting')], null, [t('needs'), a.needs.join(', ')], [t('story'), a.story]];
    if (a.when) lines.push([t('when'), checkedLabel(a.when)]);
    if (a.budget) lines.push([t('budget'), checkedLabel(a.budget)]);
    lines.push(null, [t('name'), a.name]);
    if (a.business) lines.push([t('business'), a.business]);
    lines.push([t('phone'), a.phone]);
    if (a.email) lines.push([t('email'), a.email]);
    return lines;
  }

  function messageText(a) {
    return messageLines(a)
      .map(line => (!line ? '' : line[0] ? `*${line[0]}:* ${line[1]}` : line[1]))
      .join('\n');
  }

  function renderPreview() {
    if (!preview) return;
    preview.replaceChildren();
    messageLines(answers()).forEach((line, i) => {
      if (i) preview.append(document.createElement('br'));
      if (!line) return;
      const [label, text] = line;
      if (label) {
        const b = document.createElement('b');
        b.textContent = `${label}: `;
        preview.append(b);
      }
      const span = document.createElement('span');
      span.textContent = text || t('empty');
      if (!text) span.className = 'wa-empty';
      preview.append(span);
    });
  }

  // ---------- Validation ----------
  const phoneDigits = raw => raw.replace(/[^\d]/g, '');

  function stepError(index) {
    const a = answers();
    if (index === 0 && !a.needs.length) return ['errNeed', form.querySelector('input[name=need]')];
    if (index === 1 && a.story.length < 20) return ['errStory', field('story')];
    if (index === 2) {
      if (!a.name) return ['errName', field('name')];
      const digits = phoneDigits(a.phone);
      if (digits.length < 9 || digits.length > 15) return ['errPhone', field('phone')];
      if (a.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(a.email)) return ['errEmail', field('email')];
    }
    return null;
  }

  function showError(error) {
    form.querySelectorAll('[aria-invalid]').forEach(el => el.removeAttribute('aria-invalid'));
    if (!error) {
      errorBox.textContent = '';
      return true;
    }
    const [key, el] = error;
    errorBox.textContent = t(key);
    errorBox.dataset.key = key;
    if (el) {
      el.setAttribute('aria-invalid', 'true');
      el.focus();
    }
    return false;
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
    if (focus) panels[step].querySelector('input, textarea')?.focus({ preventScroll: true });
    const top = form.getBoundingClientRect().top + window.scrollY - 110;
    if (focus && window.scrollY > top) window.scrollTo({ top, behavior: 'smooth' });
  }

  nextButton.addEventListener('click', () => {
    if (showError(stepError(step))) goTo(step + 1);
  });
  backButton.addEventListener('click', () => {
    showError(null);
    goTo(step - 1);
  });

  // Enter in a single-line field moves forward instead of submitting early.
  form.addEventListener('keydown', event => {
    if (event.key !== 'Enter' || event.target.tagName !== 'INPUT' || ['checkbox', 'radio'].includes(event.target.type)) return;
    if (step < panels.length - 1) {
      event.preventDefault();
      nextButton.click();
    }
  });

  form.addEventListener('submit', event => {
    event.preventDefault();
    for (let i = 0; i < panels.length; i++) {
      const error = stepError(i);
      if (error) {
        goTo(i, { focus: false });
        showError(error);
        return;
      }
    }
    showError(null);
    const url = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(messageText(answers()))}`;
    waLink.href = url;
    window.open(url, '_blank', 'noopener');
    panels.forEach(panel => panel.classList.remove('is-current'));
    form.classList.add('is-done');
    done.hidden = false;
    done.focus();
  });

  form.querySelector('[data-edit]').addEventListener('click', () => {
    form.classList.remove('is-done');
    done.hidden = true;
    goTo(panels.length - 1);
  });

  // ---------- Draft (this browser only) ----------
  function saveDraft() {
    const data = Object.fromEntries(['story', 'name', 'business', 'phone', 'email'].map(n => [n, value(n)]));
    data.need = [...form.querySelectorAll('input[name=need]:checked')].map(i => i.value);
    data.when = form.querySelector('input[name=when]:checked')?.value || '';
    data.budget = form.querySelector('input[name=budget]:checked')?.value || '';
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
    if (!data) return;
    ['story', 'name', 'business', 'phone', 'email'].forEach(n => {
      if (typeof data[n] === 'string' && field(n)) field(n).value = data[n];
    });
    form.querySelectorAll('input[name=need]').forEach(i => (i.checked = (data.need || []).includes(i.value)));
    ['when', 'budget'].forEach(n => {
      form.querySelectorAll(`input[name=${n}]`).forEach(i => (i.checked = i.value === data[n]));
    });
  }

  form.addEventListener('input', () => {
    if (errorBox.textContent && !stepError(step)) showError(null);
    renderPreview();
    saveDraft();
  });
  document.addEventListener('difira:lang', () => {
    renderPreview();
    if (errorBox.dataset.key && errorBox.textContent) errorBox.textContent = t(errorBox.dataset.key);
  });

  // Radios act as toggles so an optional choice can be cleared again.
  form.querySelectorAll('.pill input[type=radio]').forEach(radio => {
    radio.addEventListener('pointerdown', () => (radio.dataset.wasChecked = String(radio.checked)));
    radio.addEventListener('click', () => {
      if (radio.dataset.wasChecked === 'true') {
        radio.checked = false;
        form.dispatchEvent(new Event('input'));
      }
    });
  });

  loadDraft();
  goTo(0, { focus: false });
  renderPreview();
})();
