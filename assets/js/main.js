/* Main UI: mobile menu + active nav */
(function(){
  const btn = document.querySelector('[data-hamburger]');
  const menu = document.querySelector('[data-mobile-menu]');
  if(btn && menu){
    btn.addEventListener('click', () => {
      menu.classList.toggle('open');
      const expanded = menu.classList.contains('open');
      btn.setAttribute('aria-expanded', expanded ? 'true' : 'false');
    });
  }

  // Mark active nav item based on current page
  const path = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
  document.querySelectorAll('.nav-links a, .mobile-menu a').forEach(a => {
    const href = (a.getAttribute('href') || '').toLowerCase();
    if(!href) return;
    if(href === path) a.classList.add('active');
  });
})();
