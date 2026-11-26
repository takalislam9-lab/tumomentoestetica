// Cabecera: transparente sobre el vídeo y sólida al bajar
const header = document.getElementById('header');
const onScroll = () => header.classList.toggle('scrolled', window.scrollY > 40);
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

// Menú móvil
const toggle = document.getElementById('navToggle');
const nav = document.getElementById('nav');
if (toggle && nav) {
  toggle.addEventListener('click', () => nav.classList.toggle('open'));
  nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => nav.classList.remove('open')));
}

// Vídeo de portada: quieto si la persona prefiere menos movimiento
const video = document.getElementById('heroVideo');
if (video) {
  const quieto = window.matchMedia('(prefers-reduced-motion: reduce)');
  const aplicar = () => { if (quieto.matches) { video.pause(); } else { const p = video.play(); if (p && p.catch) p.catch(() => {}); } };
  aplicar();
  if (quieto.addEventListener) quieto.addEventListener('change', aplicar);
}

// Aparición suave al hacer scroll
const rv = document.querySelectorAll('.rv');
if ('IntersectionObserver' in window) {
  const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), { rootMargin: '0px 0px -8% 0px' });
  rv.forEach(el => io.observe(el));
} else { rv.forEach(el => el.classList.add('in')); }

// Aviso de cookies
function setCookieChoice(val) {
  try { localStorage.setItem('tumomento_cookies', val); } catch (e) {}
  document.getElementById('cookie-banner').style.display = 'none';
}
(function () {
  let choice = null;
  try { choice = localStorage.getItem('tumomento_cookies'); } catch (e) {}
  const banner = document.getElementById('cookie-banner');
  if (banner && !choice) banner.style.display = 'flex';
})();

document.addEventListener('keydown', e => { if (e.key === 'Escape' && nav) nav.classList.remove('open'); });
