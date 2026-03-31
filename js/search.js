// Search with Dropdown Suggestions
(function () {
  const suggestions = [
    'Application deadlines',
    'Portfolio requirements',
    'Graphic Design MFA',
    'Painting & Printmaking MFA',
    'Sculpture MFA',
    'Admission events',
    'Campus visit',
    'FAQ',
    'Contact admissions',
  ];

  function init() {
    const input = document.getElementById('searchInput');
    const dropdown = document.getElementById('searchDropdown');
    if (!input || !dropdown) return;

    input.addEventListener('input', function () {
      const q = this.value.trim().toLowerCase();
      dropdown.innerHTML = '';
      if (!q) { dropdown.style.display = 'none'; return; }

      const matches = suggestions.filter(s => s.toLowerCase().includes(q));
      if (!matches.length) { dropdown.style.display = 'none'; return; }

      matches.forEach(s => {
        const item = document.createElement('div');
        item.className = 'search-item';
        item.innerHTML = `<span class="search-icon">🔍</span>${s}`;
        item.addEventListener('click', () => {
          input.value = s;
          dropdown.style.display = 'none';
        });
        dropdown.appendChild(item);
      });
      dropdown.style.display = 'block';
    });

    document.addEventListener('click', (e) => {
      if (!e.target.closest('.search-wrapper')) {
        dropdown.style.display = 'none';
      }
    });

    const searchBtn = document.getElementById('searchBtn');
    if (searchBtn) {
      searchBtn.addEventListener('click', () => {
        const q = input.value.trim();
        if (q) console.log('Searching for:', q);
      });
    }

    // Enter key
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        dropdown.style.display = 'none';
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
