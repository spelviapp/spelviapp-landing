/* spelvi — shared site behavior: nav shadow, theme toggle, reveal, TOC scrollspy */
(function () {
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var root = document.documentElement;

  /* Theme */
  try { var s = localStorage.getItem('spelvi-theme'); if (s) root.setAttribute('data-theme', s); } catch (e) {}
  function ico() {
    var b = document.getElementById('themeIco'); if (!b) return;
    var dark = root.getAttribute('data-theme') === 'dark';
    b.innerHTML = dark
      ? '<path d="M21 12.8A9 9 0 1 1 11.2 3 7 7 0 0 0 21 12.8z"/>'
      : '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>';
  }
  ico();
  var tb = document.getElementById('themeBtn');
  if (tb) tb.addEventListener('click', function () {
    var next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    try { localStorage.setItem('spelvi-theme', next); } catch (e) {}
    ico();
  });

  /* Nav shadow */
  var nav = document.getElementById('nav');
  function onScroll() { if (nav) nav.classList.toggle('scrolled', window.scrollY > 8); }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* Marker swipe in headers */
  document.querySelectorAll('.mark').forEach(function (m) {
    setTimeout(function () { m.classList.add('swiped'); }, reduced ? 0 : 500);
  });

  /* Reveal */
  var io = new IntersectionObserver(function (es) {
    es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
  }, { threshold: 0.14 });
  document.querySelectorAll('.reveal').forEach(function (el) { io.observe(el); });

  /* TOC scrollspy */
  var links = [].slice.call(document.querySelectorAll('.toc a'));
  if (links.length) {
    var targets = links.map(function (a) { return document.querySelector(a.getAttribute('href')); }).filter(Boolean);
    var spy = new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        if (!e.isIntersecting) return;
        links.forEach(function (a) { a.classList.toggle('active', a.getAttribute('href') === '#' + e.target.id); });
      });
    }, { rootMargin: '-80px 0px -70% 0px', threshold: 0 });
    targets.forEach(function (t) { spy.observe(t); });
  }
})();
