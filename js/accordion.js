// Accordion for FAQ
(function () {
  function init() {
    document.querySelectorAll('.accordion-item').forEach(item => {
      const header = item.querySelector('.accordion-header');
      const body = item.querySelector('.accordion-body');
      if (!header || !body) return;

      header.addEventListener('click', () => {
        const isOpen = item.classList.contains('open');
        // Close all
        document.querySelectorAll('.accordion-item.open').forEach(el => {
          el.classList.remove('open');
          el.querySelector('.accordion-body').style.maxHeight = '0';
        });
        // Open clicked if was closed
        if (!isOpen) {
          item.classList.add('open');
          body.style.maxHeight = body.scrollHeight + 'px';
        }
      });

      body.style.maxHeight = '0';
      body.style.overflow = 'hidden';
      body.style.transition = 'max-height 0.25s ease';
    });

    // Open first item by default
    const first = document.querySelector('.accordion-item');
    if (first) {
      const body = first.querySelector('.accordion-body');
      first.classList.add('open');
      if (body) body.style.maxHeight = body.scrollHeight + 'px';
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
