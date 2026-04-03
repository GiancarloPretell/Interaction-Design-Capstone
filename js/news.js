const cards = document.querySelectorAll(".news-card");

cards.forEach(card => {
  card.addEventListener("click", () => {

    const isActive = card.classList.contains("active");

    // close all
    cards.forEach(c => {
      c.classList.remove("active", "expanded");
    });

    // toggle clicked
    if (!isActive) {
      card.classList.add("active", "expanded");
    }
  });
});