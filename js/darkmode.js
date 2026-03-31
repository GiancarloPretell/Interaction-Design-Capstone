// Dark Mode Toggle
(function () {
  const STORAGE_KEY = 'yale-dark-mode';

  function applyMode(dark) {
    document.body.classList.toggle('dark-mode', dark);
    const toggles = document.querySelectorAll('.dark-toggle');
    toggles.forEach(btn => { btn.textContent = dark ? '☀' : '☾'; });
  }

  function init() {
    const saved = localStorage.getItem(STORAGE_KEY);
    const dark = saved === 'true';
    applyMode(dark);

    document.querySelectorAll('.dark-toggle').forEach(btn => {
      btn.addEventListener('click', () => {
        const isDark = document.body.classList.contains('dark-mode');
        localStorage.setItem(STORAGE_KEY, !isDark);
        applyMode(!isDark);
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
