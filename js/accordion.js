/**
 * accordion.js — FAQ Accordion Component
 *
 * Adds expand/collapse behavior to all .accordion-item elements on the page.
 * Clicking an accordion header opens that item and closes any previously
 * open item (only one item is open at a time).
 *
 * Depends on:
 *   - HTML elements with classes: .accordion-item, .accordion-header, .accordion-body
 *   - CSS in faq.css that handles the open/closed visual state via .open class
 *
 * Behavior:
 *   - The first accordion item is automatically opened on page load
 *   - Body height animates via inline max-height (CSS transition handles smoothness)
 */
(function () {
  function init() {
    document.querySelectorAll('.accordion-item').forEach(item => {
      const header = item.querySelector('.accordion-header');
      const body   = item.querySelector('.accordion-body');
      if (!header || !body) return;  // Skip malformed items missing required elements

      header.addEventListener('click', () => {
        const isOpen = item.classList.contains('open');

        // Close all currently open accordion items before opening a new one
        document.querySelectorAll('.accordion-item.open').forEach(el => {
          el.classList.remove('open');
          el.querySelector('.accordion-body').style.maxHeight = '0';
        });

        // If the clicked item was closed, open it; if it was open, leave it closed
        if (!isOpen) {
          item.classList.add('open');
          body.style.maxHeight = body.scrollHeight + 'px';  // Exact content height for smooth animation
        }
      });

      // Initialize all bodies collapsed (max-height: 0 with smooth transition)
      body.style.maxHeight  = '0';
      body.style.overflow   = 'hidden';
      body.style.transition = 'max-height 0.25s ease';
    });

    // Open the first accordion item by default so users see an example answer
    const first = document.querySelector('.accordion-item');
    if (first) {
      const body = first.querySelector('.accordion-body');
      first.classList.add('open');
      if (body) body.style.maxHeight = body.scrollHeight + 'px';
    }
  }

  // Run init after the DOM is fully parsed; if already parsed, run immediately
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();