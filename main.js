// ===== Header + progress on scroll =====
const header = document.getElementById('header');
const progress = document.getElementById('progress');
function onScroll(){
  header.classList.toggle('scrolled', window.scrollY > 30);
  const h = document.documentElement;
  const p = h.scrollTop / (h.scrollHeight - h.clientHeight);
  progress.style.width = (p * 100) + '%';
  // parallax
  document.querySelectorAll('[data-parallax]').forEach(el => {
    const r = el.parentElement.getBoundingClientRect();
    const offset = (r.top + r.height/2 - window.innerHeight/2) * -0.12;
    el.style.transform = 'translateY(' + offset.toFixed(1) + 'px)';
  });
}
onScroll();
window.addEventListener('scroll', () => requestAnimationFrame(onScroll), { passive: true });

// ===== Mobile nav =====
const burger = document.getElementById('burger');
const nav = document.getElementById('nav');
burger.addEventListener('click', () => { nav.classList.toggle('open'); burger.classList.toggle('open'); });
nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => { nav.classList.remove('open'); burger.classList.remove('open'); }));

// ===== Reveal + counters =====
const io = new IntersectionObserver(entries => entries.forEach(e => {
  if (!e.isIntersecting) return;
  e.target.classList.add('in');
  const num = e.target.querySelector('.stat__num');
  if (num && !num.dataset.done) { num.dataset.done = 1; countUp(num); }
  io.unobserve(e.target);
}), { threshold: 0.14 });
document.querySelectorAll('.reveal').forEach((el, i) => { el.style.transitionDelay = (i % 3) * 80 + 'ms'; io.observe(el); });

function countUp(el){
  const to = +el.dataset.to, suffix = el.dataset.suffix || '';
  const dur = 1400, t0 = performance.now();
  const fmt = n => n >= 1000 ? Math.round(n).toLocaleString('fr-FR') : Math.round(n);
  (function tick(t){
    const p = Math.min((t - t0) / dur, 1);
    const eased = 1 - Math.pow(1 - p, 3);
    el.textContent = fmt(to * eased) + suffix;
    if (p < 1) requestAnimationFrame(tick);
  })(t0);
}
