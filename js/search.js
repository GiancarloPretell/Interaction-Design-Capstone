/**
 * search.js — Homepage Search with Autocomplete Dropdown
 *
 * Powers the search bar on the Home page. As the user types, matching
 * suggestions are filtered from a static list and displayed in a dropdown.
 * Selecting a suggestion fills the input field; clicking outside dismisses
 * the dropdown.
 *
 * Depends on:
 *   - #searchInput   — the text input field
 *   - #searchDropdown — the container where suggestion items are rendered
 *   - #searchBtn     — the submit/search button (optional; reserved for future use)
 *   - .search-wrapper — the wrapper element used to detect outside clicks
 *   - CSS classes .search-item, .search-icon defined in home.css
 *
 * Behavior:
 *   - Typing filters suggestions by substring match (case-insensitive)
 *   - Clicking a suggestion populates the input and hides the dropdown
 *   - Clicking anywhere outside .search-wrapper closes the dropdown
 *   - Pressing Enter closes the dropdown (search submission is a future feature)
 */
(function () {
  // Static list of searchable topics across the site
  const suggestions = [
    "Application deadlines",
    "Portfolio requirements",
    "Graphic Design MFA",
    "Painting & Printmaking MFA",
    "Sculpture MFA",
    "Admission events",
    "Campus visit",
    "FAQ",
    "Contact admissions",
    "News",
    "Programs",
    "Apply",
    "Events",
    "Portfolio Requirements",
    "Spring Open House",
    "Virtual Portfolio Review",
    "Guest Lecture",
  ];

  function init() {
    const input = document.getElementById("searchInput");
    const dropdown = document.getElementById("searchDropdown");

    // Exit early if the required elements aren't present on this page
    if (!input || !dropdown) return;

    function showMessage(message) {
      dropdown.innerHTML = "";
      const item = document.createElement("div");
      item.className = "search-item empty-state";
      item.textContent = message;
      dropdown.appendChild(item);
      dropdown.style.display = "block";
    }

    input.addEventListener("input", function () {
      const q = this.value.trim().toLowerCase();
      // Clear any previously rendered suggestion items
      dropdown.innerHTML = "";

      // Hide the dropdown entirely when the input is blank
      if (!q) {
        dropdown.style.display = "none";
        return;
      }

      const matches = suggestions.filter((s) => s.toLowerCase().includes(q));

      // Hide the dropdown if nothing matched, or show a "no results" message if the input isn't empty but there are no matches
      if (!matches.length) {
        showMessage("No results found");
        return;
      }

      // Build and append a clickable item for each matching suggestion
      matches.forEach((s) => {
        const item = document.createElement("div");
        item.className = "search-item";
        item.innerHTML = `<span class="search-icon">🔍</span>${s}`;

        // Selecting a suggestion fills the input and closes the dropdown
        item.addEventListener("click", () => {
          input.value = s;
          dropdown.style.display = "none";
        });

        dropdown.appendChild(item);
      });

      // Reveal the populated dropdown below the input
      dropdown.style.display = "block";
    });

    // Close the dropdown when the user clicks anywhere outside the search bar
    document.addEventListener("click", (e) => {
      if (!e.target.closest(".search-wrapper")) {
        dropdown.style.display = "none";
      }
    });

    // Pressing Enter closes the dropdown; actual search submission is a future feature
    input.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        dropdown.style.display = "none";
      }
    });

    // Optional button (future feature safe)
    const searchBtn = document.getElementById("searchBtn");
    if (searchBtn) {
      searchBtn.addEventListener("click", () => {
        dropdown.style.display = "none";
      });
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
