const header = document.querySelector('.site-header');
const toggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('#navLinks');
const progress = document.querySelector('.scroll-progress span');
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function setMenuOpen(open) {
  if (!toggle || !navLinks) return;
  toggle.setAttribute('aria-expanded', String(open));
  const english = document.documentElement.lang === 'en';
  toggle.setAttribute('aria-label', open ? (english ? 'Close menu' : 'Tutup menu') : (english ? 'Open menu' : 'Buka menu'));
  navLinks.classList.toggle('open', open);
  document.body.style.overflow = open ? 'hidden' : '';
}

if (toggle && navLinks) {
  toggle.addEventListener('click', () => setMenuOpen(toggle.getAttribute('aria-expanded') !== 'true'));
  navLinks.querySelectorAll('a').forEach(link => link.addEventListener('click', () => setMenuOpen(false)));
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') setMenuOpen(false);
  });
  window.addEventListener('resize', () => {
    if (window.innerWidth > 820) setMenuOpen(false);
  });
}

function updateScrollState() {
  const top = window.scrollY;
  if (header) header.classList.toggle('scrolled', top > 8);
  if (progress) {
    const scrollable = document.documentElement.scrollHeight - window.innerHeight;
    progress.style.transform = `scaleX(${scrollable > 0 ? Math.min(top / scrollable, 1) : 0})`;
  }
}

updateScrollState();
window.addEventListener('scroll', updateScrollState, { passive: true });

const revealItems = document.querySelectorAll('.reveal');
if (!reduceMotion && 'IntersectionObserver' in window) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('in');
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -35px 0px' });

  revealItems.forEach((item, index) => {
    item.style.transitionDelay = `${Math.min(index % 3, 2) * 70}ms`;
    observer.observe(item);
  });
} else {
  revealItems.forEach(item => item.classList.add('in'));
}

const tiltCard = document.querySelector('[data-tilt]');
const tiltArea = tiltCard?.closest('.hero-product');
if (tiltCard && tiltArea && !reduceMotion && window.matchMedia('(pointer: fine)').matches) {
  tiltArea.addEventListener('pointermove', event => {
    const bounds = tiltArea.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y = (event.clientY - bounds.top) / bounds.height - 0.5;
    tiltCard.style.setProperty('--tilt-x', `${x * 4}deg`);
    tiltCard.style.setProperty('--tilt-y', `${y * -4}deg`);
  });
  tiltArea.addEventListener('pointerleave', () => {
    tiltCard.style.setProperty('--tilt-x', '0deg');
    tiltCard.style.setProperty('--tilt-y', '0deg');
  });
}
