// Form Validation
(function () {
  function validateForm(form) {
    let valid = true;

    // Clear previous errors
    form.querySelectorAll('.field-error').forEach(el => el.classList.remove('field-error'));
    form.querySelectorAll('.label-error').forEach(el => el.remove());

    // Validate required fields
    form.querySelectorAll('[required]').forEach(field => {
      const val = field.value.trim();
      if (!val) {
        markError(field);
        valid = false;
      } else if (field.type === 'email' && !isValidEmail(val)) {
        markError(field, 'Please enter a valid email');
        valid = false;
      }
    });

    return valid;
  }

  function markError(field, message) {
    const group = field.closest('.form-group');
    if (!group) return;

    group.classList.add('field-error');

    // Add inline error next to label
    const label = group.querySelector('.form-label');
    if (label && !label.querySelector('.label-error')) {
      const errSpan = document.createElement('span');
      errSpan.className = 'label-error';
      errSpan.textContent = message || '← This field needs to be complete';
      label.appendChild(errSpan);
    }
  }

  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function init() {
    document.querySelectorAll('form[data-validate]').forEach(form => {
      form.addEventListener('submit', function (e) {
        e.preventDefault();
        if (validateForm(this)) {
          const redirect = this.dataset.redirect;
          if (redirect) {
            window.location.href = redirect;
          }
        }
      });

      // Live validation on blur
      form.querySelectorAll('[required]').forEach(field => {
        field.addEventListener('blur', function () {
          const group = this.closest('.form-group');
          if (!group) return;
          if (this.value.trim()) {
            group.classList.remove('field-error');
            group.querySelectorAll('.label-error').forEach(el => el.remove());
          }
        });
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
