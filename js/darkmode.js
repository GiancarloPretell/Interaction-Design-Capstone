// Dark Mode Toggle
(function () {
  const STORAGE_KEY = 'yale-dark-mode';

  function applyMode(dark) {
    document.body.classList.toggle('dark-mode', dark);

    // Update all toggle buttons
    document.querySelectorAll('.dark-toggle').forEach(btn => {
      btn.textContent = dark ? ' ☀ ' : ' ☾ ';
    });
  }

  function init() {
    const saved = localStorage.getItem(STORAGE_KEY);

    let dark;

    if (saved === null) {
      // ✅ Default behavior (choose ONE option)

      // OPTION A: Always start LIGHT
      dark = false;

      // OPTION B (uncomment if you want system theme instead)
      // dark = window.matchMedia("(prefers-color-scheme: dark)").matches;

    } else {
      // ✅ Use saved preference
      dark = saved === 'true';
    }

    applyMode(dark);

    // Toggle click
    document.querySelectorAll('.dark-toggle').forEach(btn => {
      btn.addEventListener('click', () => {
        const isDark = document.body.classList.contains('dark-mode');
        const newMode = !isDark;

        localStorage.setItem(STORAGE_KEY, newMode);
        applyMode(newMode);
      });
    });
  }

  // Run after DOM loads
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();