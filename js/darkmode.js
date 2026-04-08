/**
 * darkmode.js — Dark Mode Toggle
 *
 * Manages the site-wide light/dark color scheme. The user's preference is
 * persisted in localStorage so it carries over between page loads and
 * across all pages of the site.
 *
 * Behavior:
 *   - On first visit (no saved preference): defaults to light mode
 *   - On subsequent visits: restores the user's last saved preference
 *   - Clicking any .dark-toggle button switches the mode and saves the new preference
 *
 * Depends on:
 *   - HTML elements with class .dark-toggle (the toggle button, present in the navbar)
 *   - CSS class body.dark-mode defined in global.css which overrides CSS variables
 */
(function () {
  const STORAGE_KEY = "yale-dark-mode"; // localStorage key used to persist the preference

  /**
   * Applies or removes dark mode from the page.
   * @param {boolean} dark - true to enable dark mode, false for light mode
   */
  function applyMode(dark) {
    document.body.classList.toggle("dark-mode", dark);

    // Update all toggle buttons (moon icon in light mode, sun icon in dark mode)
    document.querySelectorAll(".dark-toggle").forEach((btn) => {
      btn.textContent = dark ? " ☀ " : " ☾ ";
    });
  }

  function init() {
    const saved = localStorage.getItem(STORAGE_KEY);

    let dark;

    if (saved === null) {
      // No saved preference — use the default behavior defined below
      // OPTION A: Always start in light mode (current default)
      dark = false;

      // OPTION B (uncomment to use the system's preferred color scheme instead):
      // dark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    } else {
      // Restore the user's previously saved preference
      dark = saved === "true";
    }

    applyMode(dark);

    // Attach click listener to all toggle buttons on the page
    document.querySelectorAll(".dark-toggle").forEach((btn) => {
      btn.addEventListener("click", () => {
        const isDark = document.body.classList.contains("dark-mode");
        const newMode = !isDark; // Toggle to the opposite mode

        localStorage.setItem(STORAGE_KEY, newMode); // Persist the new preference
        applyMode(newMode);
      });
    });
  }

  // Run init after the DOM is fully parsed; if already parsed, run immediately
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
