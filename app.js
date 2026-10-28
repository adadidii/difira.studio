const header = document.querySelector('.site-header');
const toggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('#navLinks');
const progress = document.querySelector('.scroll-progress span');
const themedSections = [...document.querySelectorAll('main > .theme-dark, main > .theme-light, main > div > .theme-dark, footer.theme-dark')];
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const isEnglish = () => document.documentElement.lang !== 'id';

// ---------- Mobile menu ----------
function setMenuOpen(open) {
  if (!toggle || !navLinks) return;
  toggle.setAttribute('aria-expanded', String(open));
  toggle.setAttribute('aria-label', open ? (isEnglish() ? 'Close menu' : 'Tutup menu') : isEnglish() ? 'Open menu' : 'Buka menu');
  navLinks.classList.toggle('open', open);
  header?.classList.toggle('menu-open', open);
  document.body.style.overflow = open ? 'hidden' : '';
  updateHeader();
}

if (toggle && navLinks) {
  toggle.addEventListener('click', () => setMenuOpen(toggle.getAttribute('aria-expanded') !== 'true'));
  navLinks.querySelectorAll('a').forEach(link => link.addEventListener('click', () => setMenuOpen(false)));
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') setMenuOpen(false);
  });
  window.addEventListener('resize', () => {
    if (window.innerWidth > 900) setMenuOpen(false);
  });
}

// ---------- Header: glass once scrolled, colors follow the section underneath ----------
function updateHeader() {
  if (!header) return;
  header.classList.toggle('scrolled', window.scrollY > 8);
  const probe = header.getBoundingClientRect().bottom - 30;
  const under = themedSections.find(section => {
    const rect = section.getBoundingClientRect();
    return rect.top <= probe && rect.bottom > probe;
  });
  header.classList.toggle('on-light', Boolean(under?.classList.contains('theme-light')));
}

// ---------- Scroll-linked effects ----------
const clamp01 = value => Math.min(1, Math.max(0, value));

const statement = document.querySelector('[data-statement]');
function splitStatement() {
  if (!statement || reduceMotion) return;
  const words = statement.textContent.trim().split(/\s+/);
  statement.textContent = '';
  words.forEach((word, i) => {
    const span = document.createElement('span');
    span.className = 'w';
    span.textContent = word;
    statement.append(span);
    if (i < words.length - 1) statement.append(' ');
  });
}

function updateStatement() {
  if (!statement || reduceMotion) return;
  const rect = statement.getBoundingClientRect();
  const vh = window.innerHeight;
  const p = clamp01((vh * 0.85 - rect.top) / (rect.height + vh * 0.35));
  const words = statement.querySelectorAll('.w');
  const lit = Math.round(p * words.length);
  words.forEach((word, i) => word.classList.toggle('on', i < lit));
}

const track = document.querySelector('[data-track]');
function updateTrack() {
  if (!track) return;
  const rect = track.getBoundingClientRect();
  const vh = window.innerHeight;
  const p = reduceMotion ? 1 : clamp01((vh * 0.8 - rect.top) / (rect.height + vh * 0.2));
  track.style.setProperty('--p', p.toFixed(3));
  const steps = track.querySelectorAll('li');
  steps.forEach((step, i) => step.classList.toggle('on', p >= i / steps.length + 0.02));
}

const stackCards = [...document.querySelectorAll('.show-card')];
function updateStack() {
  if (reduceMotion || !stackCards.length || window.innerWidth <= 900) return;
  stackCards.forEach((card, i) => {
    const next = stackCards[i + 1];
    if (!next) return;
    const top = parseFloat(getComputedStyle(card).top) || 0;
    const covered = clamp01(1 - (next.getBoundingClientRect().top - top) / card.offsetHeight);
    card.style.setProperty('--p', covered.toFixed(3));
  });
}

let ticking = false;
function onScroll() {
  if (ticking) return;
  ticking = true;
  requestAnimationFrame(() => {
    ticking = false;
    updateHeader();
    if (progress) {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      progress.style.transform = `scaleX(${scrollable > 0 ? Math.min(window.scrollY / scrollable, 1) : 0})`;
    }
    updateStatement();
    updateTrack();
    updateStack();
  });
}

splitStatement();
document.addEventListener('difira:lang', () => {
  splitStatement();
  onScroll();
  if (toggle) setMenuOpen(toggle.getAttribute('aria-expanded') === 'true');
});
window.addEventListener('scroll', onScroll, { passive: true });
window.addEventListener('resize', onScroll);
onScroll();

// ---------- Reveal on scroll ----------
const revealItems = document.querySelectorAll('.reveal');
if (!reduceMotion && 'IntersectionObserver' in window) {
  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('in');
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' },
  );
  revealItems.forEach((item, index) => {
    item.style.transitionDelay = `${Math.min(index % 3, 2) * 80}ms`;
    observer.observe(item);
  });
} else {
  revealItems.forEach(item => item.classList.add('in'));
}

// ---------- Hero background video ----------
const heroVideo = document.querySelector('.hero-video');
const pauseButton = document.querySelector('.hero-pause');
function setHeroPaused(paused) {
  if (!heroVideo) return;
  if (paused) heroVideo.pause();
  else heroVideo.play().catch(() => {});
  pauseButton?.setAttribute('aria-pressed', String(paused));
}
if (heroVideo) {
  if (reduceMotion) {
    heroVideo.removeAttribute('autoplay');
    setHeroPaused(true);
  }
  pauseButton?.addEventListener('click', () => setHeroPaused(!heroVideo.paused));
}

// ---------- Inline sample videos: play only while visible ----------
document.querySelectorAll('video[data-autoplay]').forEach(video => {
  if (reduceMotion || !('IntersectionObserver' in window)) {
    video.controls = true;
    return;
  }
  new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          if (video.preload === 'none') video.preload = 'auto';
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      });
    },
    { threshold: 0.35 },
  ).observe(video);
});

// ---------- Pointer effects (mouse and trackpad only) ----------
// The cursor itself stays the normal arrow. Dark page headers light up their grid around the
// pointer and leave a short trail of glowing cells; cards get a soft glow that follows it.
const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
if (finePointer && !reduceMotion) {
  document.documentElement.classList.add('fine-pointer');
  const GRID = 72; // same as the background-size of .hero::after and .page-hero::after

  document.querySelectorAll('.hero, .page-hero').forEach(section => {
    const layer = document.createElement('div');
    layer.className = 'spotlight';
    layer.setAttribute('aria-hidden', 'true');
    section.append(layer);
    let lastCell = '';

    section.addEventListener('pointermove', event => {
      if (event.pointerType !== 'mouse') return;
      const rect = section.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      section.style.setProperty('--mx', `${x}px`);
      section.style.setProperty('--my', `${y}px`);
      section.classList.add('is-lit');

      const cx = Math.floor(x / GRID);
      const cy = Math.floor(y / GRID);
      if (`${cx},${cy}` === lastCell) return;
      lastCell = `${cx},${cy}`;
      const cell = document.createElement('span');
      cell.className = 'spot-cell';
      cell.style.left = `${cx * GRID}px`;
      cell.style.top = `${cy * GRID}px`;
      cell.addEventListener('animationend', () => cell.remove());
      layer.append(cell);
    }, { passive: true });

    section.addEventListener('pointerleave', () => {
      section.classList.remove('is-lit');
      lastCell = '';
    });
  });

  // Cards: the glow position is set on whichever card the pointer is over, including the
  // portfolio cards studio.js adds after load.
  const glowCards = '.show-card, .service, .approach-card, .pkg, .value, .step, .faq, .work-card, .about-panel, .brief-next';
  document.addEventListener('pointermove', event => {
    const card = event.target instanceof Element ? event.target.closest(glowCards) : null;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    card.style.setProperty('--gx', `${event.clientX - rect.left}px`);
    card.style.setProperty('--gy', `${event.clientY - rect.top}px`);
  }, { passive: true });

  // Buttons lean a few pixels toward the pointer. `translate` stacks with the CSS hover lift.
  document.querySelectorAll('.button, .nav-cta, .job-arrow').forEach(button => {
    button.addEventListener('pointermove', event => {
      const rect = button.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width - 0.5) * 10;
      const y = ((event.clientY - rect.top) / rect.height - 0.5) * 8;
      button.style.translate = `${x.toFixed(1)}px ${y.toFixed(1)}px`;
    });
    button.addEventListener('pointerleave', () => (button.style.translate = ''));
  });
}

// ---------- Dot-matrix type ----------
// Elements with data-dots (the footer wordmark, the 404 number) are redrawn as a grid of dots
// sampled from their own text. Dots near the pointer swell, turn mint and drift outward, then
// fade back. Without a mouse, or with reduced motion, the dots stay still.
function dotMatrix(el) {
  const canvas = document.createElement('canvas');
  canvas.setAttribute('aria-hidden', 'true');
  el.append(canvas);
  el.classList.add('is-dots');
  const ctx = canvas.getContext('2d');
  const RADIUS = 150;
  let dots = [];
  let width = 0;
  let height = 0;
  let pointer = null;
  let raf = 0;

  function sample() {
    const rect = el.getBoundingClientRect();
    const style = getComputedStyle(el);
    const fontSize = parseFloat(style.fontSize);
    const ratio = window.devicePixelRatio || 1;
    width = rect.width;
    height = rect.height;
    // A hidden tab or collapsed layout can report zero size; the ResizeObserver resamples later.
    if (width < 1 || height < 1) return;
    canvas.width = Math.round(width * ratio);
    canvas.height = Math.round(height * ratio);
    ctx.setTransform(ratio, 0, 0, ratio, 0, 0);

    // Draw the text once off screen, then keep a dot wherever a grid point lands on ink.
    const probe = document.createElement('canvas');
    probe.width = Math.ceil(width);
    probe.height = Math.ceil(height);
    const pctx = probe.getContext('2d', { willReadFrequently: true });
    pctx.font = `${style.fontWeight} ${fontSize}px ${style.fontFamily}`;
    if ('letterSpacing' in pctx) pctx.letterSpacing = style.letterSpacing;
    pctx.textAlign = 'center';
    pctx.textBaseline = 'middle';
    pctx.fillText(el.dataset.dots || el.textContent.trim(), width / 2, height / 2 + fontSize * 0.04);
    const ink = pctx.getImageData(0, 0, probe.width, probe.height).data;

    const step = Math.max(5, Math.round(fontSize / 26));
    dots = [];
    for (let y = step / 2; y < height; y += step) {
      for (let x = step / 2; x < width; x += step) {
        if (ink[(Math.floor(y) * probe.width + Math.floor(x)) * 4 + 3] > 128) {
          dots.push({ x, y, r: step * 0.34, glow: 0 });
        }
      }
    }
    draw();
  }

  function draw() {
    ctx.clearRect(0, 0, width, height);
    let active = false;
    for (const dot of dots) {
      let target = 0;
      if (pointer) {
        const d = Math.hypot(dot.x - pointer.x, dot.y - pointer.y);
        target = d < RADIUS ? 1 - d / RADIUS : 0;
      }
      dot.glow = target > dot.glow ? target : dot.glow * 0.9;
      if (dot.glow > 0.01) active = true;
      const g = dot.glow;
      // Resting dots fade from top to bottom like the old gradient wordmark.
      const rest = 0.26 - (dot.y / height) * 0.18;
      let x = dot.x;
      let y = dot.y;
      if (g && pointer) {
        const angle = Math.atan2(dot.y - pointer.y, dot.x - pointer.x);
        x += Math.cos(angle) * g * 5;
        y += Math.sin(angle) * g * 5;
      }
      ctx.beginPath();
      ctx.arc(x, y, dot.r * (1 + g * 0.9), 0, Math.PI * 2);
      ctx.fillStyle = g > 0.02 ? `rgba(34, 211, 166, ${Math.min(1, rest + g)})` : `rgba(242, 245, 249, ${rest})`;
      ctx.fill();
    }
    raf = active ? requestAnimationFrame(draw) : 0;
  }

  if (finePointer && !reduceMotion) {
    el.addEventListener('pointermove', event => {
      const rect = canvas.getBoundingClientRect();
      pointer = { x: event.clientX - rect.left, y: event.clientY - rect.top };
      if (!raf) raf = requestAnimationFrame(draw);
    });
    el.addEventListener('pointerleave', () => {
      pointer = null;
      if (!raf) raf = requestAnimationFrame(draw);
    });
  }

  let resizeTimer;
  new ResizeObserver(() => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(sample, 100);
  }).observe(el);
  (document.fonts?.ready || Promise.resolve()).then(sample);
}

if (window.ResizeObserver) document.querySelectorAll('[data-dots]').forEach(dotMatrix);
