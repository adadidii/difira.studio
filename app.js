const header = document.querySelector('.site-header');
const toggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('#navLinks');

function setMenuOpen(open) {
  if (!toggle) return;
  toggle.setAttribute('aria-expanded', String(open));
  toggle.setAttribute('aria-label', open ? 'Tutup menu' : 'Buka menu');
  navLinks.classList.toggle('open', open);
}

if (toggle && navLinks) {
  toggle.addEventListener('click', () => setMenuOpen(toggle.getAttribute('aria-expanded') !== 'true'));
  navLinks.querySelectorAll('a').forEach(link => link.addEventListener('click', () => setMenuOpen(false)));
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') setMenuOpen(false);
  });
}

if (header) {
  const onScroll = () => header.classList.toggle('scrolled', window.scrollY > 8);
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
}

const revealItems = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('in');
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });
  revealItems.forEach((item, index) => {
    item.style.transitionDelay = `${(index % 3) * 80}ms`;
    observer.observe(item);
  });
} else {
  revealItems.forEach(item => item.classList.add('in'));
}
