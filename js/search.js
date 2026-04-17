/**
 * search.js — reusable site search for hero and compact navbar search
 */
(function () {
  const routes = [
    {
      label: "Application Deadlines",
      url: "DeadlinesFrame.html",
      category: "Deadline",
    },
    {
      label: "Portfolio Requirements",
      url: "RequirementsFrame.html",
      category: "Admissions",
    },
    {
      label: "Graphic Design MFA",
      url: "GraphicDesignFrame.html",
      category: "Program",
    },
    {
      label: "Painting & Printmaking MFA",
      url: "PrintmakingFrame.html",
      category: "Program",
    },
    { label: "Sculpture MFA", url: "SculptureFrame.html", category: "Program" },
    { label: "Admission Events", url: "EventsFrame.html", category: "Events" },
    { label: "Campus Visit", url: "ContactFrame.html", category: "Visit" },
    { label: "FAQ", url: "FAQFrame.html", category: "Support" },
    {
      label: "Contact Admissions",
      url: "ContactFrame.html",
      category: "Support",
    },
    { label: "News", url: "NewsFrame.html", category: "News" },
    { label: "Programs", url: "ProgramsFrame.html", category: "Programs" },
    { label: "Apply", url: "ApplyFrame.html", category: "Admissions" },
    { label: "Events", url: "EventsFrame.html", category: "Events" },
    {
      label: "Spring Open House",
      url: "OpenHouseFrame.html",
      category: "Event",
    },
    {
      label: "Virtual Portfolio Review",
      url: "PortfolioReviewFrame.html",
      category: "Workshop",
    },
    { label: "Guest Lecture", url: "LecturesFrame.html", category: "Lecture" },
    { label: "Workshops", url: "EventsFrame.html", category: "Workshops" },
    { label: "Trips", url: "EventsFrame.html", category: "Highlights" },
  ];

  function getMatches(query) {
    return routes.filter((item) => item.label.toLowerCase().includes(query));
  }

  function getBestMatch(query) {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return null;

    return (
      routes.find((i) => i.label.toLowerCase() === normalized) ||
      routes.find((i) => i.label.toLowerCase().startsWith(normalized)) ||
      routes.find((i) => i.label.toLowerCase().includes(normalized))
    );
  }

  function initSearch(wrapper) {
    const input =
      wrapper.querySelector('[data-role="search-input"]') ||
      wrapper.querySelector("#searchInput");

    const dropdown =
      wrapper.querySelector('[data-role="search-dropdown"]') ||
      wrapper.querySelector("#searchDropdown");

    const status =
      wrapper.querySelector('[data-role="search-status"]') ||
      wrapper.querySelector("#searchStatus");

    const searchBtn =
      wrapper.querySelector('[data-role="search-btn"]') ||
      wrapper.querySelector("#searchBtn");

    const loader =
      wrapper.querySelector('[data-role="search-loader"]') ||
      wrapper.querySelector("#searchLoader");

    if (!input || !dropdown) return;

    // 🔥 MOVE DROPDOWN OUTSIDE HERO/NAV (ONLY ONCE)
    if (!dropdown.dataset.moved) {
      document.body.appendChild(dropdown);
      dropdown.dataset.moved = "true";
      dropdown.classList.add("search-dropdown-floating");
    }

    let searchDelay;

    function positionDropdown() {
      if (!input) return;

      const rect = input.getBoundingClientRect();

      dropdown.style.position = "absolute";
      dropdown.style.top = `${rect.bottom + window.scrollY + 8}px`;
      dropdown.style.left = `${rect.left + window.scrollX}px`;
      dropdown.style.width = `${rect.width}px`;
      dropdown.style.zIndex = "999999";
    }

    function clearDropdown() {
      dropdown.innerHTML = "";
      dropdown.style.display = "none";
    }

    function setStatus(message) {
      if (status) status.textContent = message || "";
    }

    function stopLoading() {
      if (searchBtn) searchBtn.classList.remove("is-loading");

      if (loader) {
        loader.classList.remove("is-visible");
        loader.setAttribute("aria-hidden", "true");
      }
    }

    function showLoading(message, keepDropdown) {
      setStatus(message || "Searching the site...");

      if (loader) {
        loader.classList.add("is-visible");
        loader.setAttribute("aria-hidden", "false");
      }

      if (keepDropdown) {
        dropdown.innerHTML =
          '<div class="search-item loading-state"><span class="loader-dot"></span>Searching the site…</div>';

        dropdown.style.display = "block";
        positionDropdown();
      }

      if (searchBtn) searchBtn.classList.add("is-loading");
    }

    function goToResult(item) {
      showLoading(`Opening ${item.label}...`, true);

      window.setTimeout(
        () => {
          window.location.href = item.url;
        },
        wrapper.classList.contains("compact-search") ? 450 : 700,
      );
    }

    function renderResults(matches) {
      dropdown.innerHTML = "";

      if (!matches.length) {
        dropdown.innerHTML =
          '<div class="search-item empty-state">No results found. Try programs, events, deadlines, or portfolio.</div>';

        dropdown.style.display = "block";
        positionDropdown();
        setStatus("No direct matches found.");
        return;
      }

      matches.forEach((item) => {
        const node = document.createElement("button");
        node.type = "button";
        node.className = "search-item search-result-btn";

        node.innerHTML = `
          <span class="search-icon">⌕</span>
          <span class="search-copy">
            <strong>${item.label}</strong>
            <small>${item.category}</small>
          </span>
        `;

        node.addEventListener("click", () => {
          input.value = item.label;
          goToResult(item);
        });

        dropdown.appendChild(node);
      });

      dropdown.style.display = "block";
      positionDropdown();

      setStatus(
        `${matches.length} result${matches.length === 1 ? "" : "s"} ready.`,
      );
    }

    // 🔥 ONE-TIME GLOBAL LISTENERS (NOT INSIDE FUNCTIONS)
    window.addEventListener("resize", positionDropdown);
    window.addEventListener("scroll", positionDropdown, true);

    input.addEventListener("input", function () {
      const query = this.value.trim().toLowerCase();

      window.clearTimeout(searchDelay);
      stopLoading();

      if (!query) {
        clearDropdown();
        setStatus("");
        return;
      }

      showLoading("Searching the site...", true);

      searchDelay = window.setTimeout(
        () => {
          renderResults(getMatches(query));
          stopLoading();
        },
        wrapper.classList.contains("compact-search") ? 180 : 260,
      );
    });

    input.addEventListener("keydown", (e) => {
      if (e.key !== "Enter") return;
      e.preventDefault();

      const match = getBestMatch(input.value);

      if (match) {
        goToResult(match);
      } else {
        renderResults(getMatches(input.value.trim().toLowerCase()));
      }
    });

    if (searchBtn) {
      searchBtn.addEventListener("click", () => {
        const match = getBestMatch(input.value);

        if (match) {
          goToResult(match);
          return;
        }

        const query = input.value.trim().toLowerCase();

        if (!query) {
          setStatus("Type a keyword to search the site.");
          return;
        }

        showLoading("Searching the site...", true);

        window.setTimeout(
          () => {
            renderResults(getMatches(query));
            stopLoading();
          },
          wrapper.classList.contains("compact-search") ? 220 : 320,
        );
      });
    }

    document.addEventListener("click", (e) => {
      if (!e.target.closest(".site-search") || !wrapper.contains(e.target)) {
        window.clearTimeout(searchDelay);
        clearDropdown();
        stopLoading();
      }
    });
  }

  function init() {
    const wrappers = document.querySelectorAll(".site-search, .search-wrapper");

    wrappers.forEach(initSearch);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
