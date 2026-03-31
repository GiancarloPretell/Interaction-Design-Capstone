// Mobile Menu Toggle
(function () {
  function init() {
    const hamburger = document.getElementById('hamburgerBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    const closeBtn = document.getElementById('mobileMenuClose');

    if (!hamburger || !mobileMenu) return;

    hamburger.addEventListener('click', () => {
      mobileMenu.classList.add('open');
      document.body.style.overflow = 'hidden';
    });

    function closeMenu() {
      mobileMenu.classList.remove('open');
      document.body.style.overflow = '';
    }

    if (closeBtn) closeBtn.addEventListener('click', closeMenu);

    // Close on backdrop click
    mobileMenu.addEventListener('click', (e) => {
      if (e.target === mobileMenu) closeMenu();
    });

    // Close on nav link click
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', closeMenu);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
