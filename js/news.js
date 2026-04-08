/**
 * news.js — News Card Expand/Collapse
 *
 * Adds click-to-expand behavior to all .news-card elements on the News page.
 * Clicking a card expands it to show the full article preview; clicking it
 * again (or clicking a different card) collapses it.
 *
 * Only one card can be expanded at a time — opening a new card automatically
 * closes whichever card was previously open.
 *
 * Depends on:
 *   - HTML elements with class .news-card
 *   - CSS classes .active and .expanded defined in news.css that control
 *     the expanded visual state (height, shadow, highlighted border, etc.)
 *
 * Behavior:
 *   - Clicking a collapsed card: adds .active and .expanded to expand it
 *   - Clicking an already-expanded card: collapses it (toggle off)
 *   - Clicking a different card: collapses the old one, expands the new one
 */
const cards = document.querySelectorAll(".news-card");

cards.forEach(card => {
  card.addEventListener("click", () => {

    const isActive = card.classList.contains("active");

    // Collapse all cards before applying new state
    cards.forEach(c => {
      c.classList.remove("active", "expanded");
    });

    // If the clicked card was not already active, expand it;
    // if it was already active, leave it collapsed (toggle off)
    if (!isActive) {
      card.classList.add("active", "expanded");
    }
  });
});