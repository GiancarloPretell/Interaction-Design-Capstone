/**
 * event-filter.js — Events Page Filter Tabs
 *
 * Handles the category filter tab buttons on the Events page. When a tab is
 * clicked, event cards that don't match the selected category are hidden and
 * the active tab is highlighted.
 *
 * Depends on:
 *   - .filter-tab elements with a data-filter attribute (e.g. data-filter="lecture")
 *   - .event-card elements with a data-type attribute (e.g. data-type="lecture")
 *   - CSS class .active on .filter-tab, styled in events.css
 *
 * Special filter value:
 *   - data-filter="all" shows every event card regardless of type
 */
(function () {
  function init() {
    const tabs = document.querySelectorAll(".filter-tab");
    const cards = document.querySelectorAll(".event-card");
    if (!tabs.length) return; // Exit early if no filter tabs exist on the page

    tabs.forEach((tab) => {
      tab.addEventListener("click", () => {
        // Remove .active from all tabs, then mark the clicked tab as active
        tabs.forEach((t) => t.classList.remove("active"));
        tab.classList.add("active");

        const filter = tab.dataset.filter; // The category to filter by (e.g. "lecture")

        cards.forEach((card) => {
          // Show the card if filter is "all" or if the card's type matches the filter
          if (filter === "all" || card.dataset.type === filter) {
            card.style.display = ""; // Restore default display (inherits from CSS)
          } else {
            card.style.display = "none"; // Hide cards that don't match the active filter
          }
        });
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
