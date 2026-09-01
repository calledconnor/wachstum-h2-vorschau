(function(){
  "use strict";

  /* ---------- Mobile-Menü ---------- */
  var toggle = document.querySelector('.nav-toggle');
  var mobileMenu = document.querySelector('.mobile-menu');
  var mobileClose = document.querySelector('.mobile-menu-close');
  if (toggle && mobileMenu) {
    toggle.addEventListener('click', function(){ mobileMenu.classList.add('open'); document.body.style.overflow = 'hidden'; });
  }
  if (mobileClose && mobileMenu) {
    mobileClose.addEventListener('click', function(){ mobileMenu.classList.remove('open'); document.body.style.overflow = ''; });
  }
  document.querySelectorAll('.mobile-menu a').forEach(function(a){
    a.addEventListener('click', function(){ mobileMenu.classList.remove('open'); document.body.style.overflow = ''; });
  });

  /* ---------- Scroll-Reveal ----------
     Gestaffelte Verzögerung pro Element, basierend auf seiner Position unter
     den .reveal-Geschwistern im selben Elternelement — Karten/Zeilen einer
     Gruppe erscheinen nacheinander statt alle gleichzeitig als ein Block. */
  var io = new IntersectionObserver(function(entries){
    entries.forEach(function(entry){
      if (entry.isIntersecting){ entry.target.classList.add('in'); io.unobserve(entry.target); }
    });
  }, {threshold:.1});
  document.querySelectorAll('.reveal').forEach(function(el){
    var siblings = Array.prototype.filter.call(el.parentElement.children, function(c){
      return c.classList.contains('reveal');
    });
    var idx = siblings.indexOf(el);
    el.style.transitionDelay = (Math.min(idx, 6) * 55) + 'ms';
    io.observe(el);
  });

  /* ---------- Tracking-Stub ----------
     Platzhalter fuer GA4 (oder Matomo), analog zur Ferienprogramm-Seite. */
  function trackEvent(name, params){
    params = params || {};
    if (window.gtag) { window.gtag('event', name, params); }
    else { console.log('[track]', name, params); }
  }
  document.querySelectorAll('[data-track]').forEach(function(el){
    el.addEventListener('click', function(){
      trackEvent(el.getAttribute('data-track'), { label: el.getAttribute('data-label') || el.textContent.trim() });
    });
  });
})();
