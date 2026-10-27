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
