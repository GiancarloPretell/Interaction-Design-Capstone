(function () {
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const glow = document.getElementById('cursorGlow');
  const parallaxNodes = Array.from(document.querySelectorAll('[data-parallax]'));
  const magneticNodes = Array.from(document.querySelectorAll('.magnetic-card, .magnetic-btn'));
  const revealNodes = Array.from(document.querySelectorAll('.reveal-card, .editorial-reveal'));

  document.querySelectorAll('.btn-primary, .btn-secondary, .event-card, .program-card, .news-card, .contact-card, .apply-info-card, .sidebar-card, .accordion-item, .req-item, .timeline-item, .form-card, .program-details-card, .support-card').forEach((node) => {
    node.classList.add('magnetic-card');
  });

  if (!prefersReduced && glow) {
    window.addEventListener('pointermove', (event) => {
      glow.style.opacity = '1';
      glow.style.left = `${event.clientX}px`;
      glow.style.top = `${event.clientY}px`;

      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      parallaxNodes.forEach((node) => {
        const speed = Number(node.dataset.parallax || 0.08);
        const x = (event.clientX - centerX) * speed * -0.03;
        const y = (event.clientY - centerY) * speed * -0.03;
        node.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      });
    });

    window.addEventListener('pointerleave', () => {
      glow.style.opacity = '0';
      parallaxNodes.forEach((node) => {
        node.style.transform = '';
      });
    });
  }

  magneticNodes.forEach((node) => {
    node.addEventListener('pointermove', (event) => {
      if (prefersReduced) return;
      const rect = node.getBoundingClientRect();
      const offsetX = event.clientX - (rect.left + rect.width / 2);
      const offsetY = event.clientY - (rect.top + rect.height / 2);
      node.style.transform = `translate(${offsetX * 0.05}px, ${offsetY * 0.05}px)`;
    });

    node.addEventListener('pointerleave', () => {
      node.style.transform = '';
    });
  });

  if (!prefersReduced && revealNodes.length) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.14 });

    revealNodes.forEach((node, index) => {
      node.style.transitionDelay = `${Math.min(index * 55, 280)}ms`;
      observer.observe(node);
    });
  } else {
    revealNodes.forEach((node) => node.classList.add('is-visible'));
  }
})();