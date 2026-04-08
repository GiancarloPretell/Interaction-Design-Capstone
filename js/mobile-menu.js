/**
 * mobile-menu.js — Mobile Navigation Menu Toggle
 *
 * Controls the off-canvas mobile navigation menu that replaces the desktop
 * navbar links on small screens. Handles opening, closing, and scroll-lock
 * behavior so the page doesn't scroll while the menu is open.
 *
 * Depends on:
 *   - #hamburgerBtn    — the button that opens the menu (visible on mobile)
 *   - #mobileMenu      — the full-screen overlay menu panel
 *   - #mobileMenuClose — the close button inside the menu
 *   - CSS class .open on #mobileMenu, styled in global.css
 */
(function () {
  function init() {
    const hamburger = document.getElementById('hamburgerBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    const closeBtn = document.getElementById('mobileMenuClose');

    // Exit early if the required elements aren't present on this page
    if (!hamburger || !mobileMenu) return;

    // Tapping the hamburger icon opens the overlay menu
    hamburger.addEventListener('click', () => {
      mobileMenu.classList.add('open');
      document.body.style.overflow = 'hidden';  // Prevent page scrolling behind the menu
    });

    /**
     * Closes the mobile menu and re-enables page scrolling.
     */
    function closeMenu() {
      mobileMenu.classList.remove('open');
      document.body.style.overflow = '';  // Restore default scroll behavior
    }

    // The explicit "×" close button inside the menu
    if (closeBtn) closeBtn.addEventListener('click', closeMenu);

    // Tapping the backdrop (the overlay area outside menu links) also closes the menu
    mobileMenu.addEventListener('click', (e) => {
      if (e.target === mobileMenu) closeMenu();  // Only close if the backdrop itself was clicked
    });

    // Clicking any navigation link inside the menu closes it before navigating
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', closeMenu);
    });
  }

  // Run init after the DOM is fully parsed; if already parsed, run immediately
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();