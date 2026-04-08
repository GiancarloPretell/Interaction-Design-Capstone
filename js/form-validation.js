/**
 * form-validation.js — Client-Side Form Validation
 *
 * Provides real-time and on-submit validation for forms that have the
 * data-validate attribute. Marks invalid fields with an error class and
 * displays inline error messages next to the field labels.
 *
 * Depends on:
 *   - <form data-validate data-redirect="url"> elements
 *   - .form-group > .form-label + input/select/textarea structure
 *   - CSS classes .field-error and .label-error defined in global.css
 *
 * Validation rules:
 *   - All fields with [required] must be non-empty
 *   - Fields with type="email" must match a basic email pattern
 *
 * On success: redirects to the URL specified in the form's data-redirect attribute
 */
(function () {
  /**
   * Validates all required fields in a form.
   * @param {HTMLFormElement} form
   * @returns {boolean} true if all fields are valid, false if any fail
   */
  function validateForm(form) {
    let valid = true;

    // Clear any previous error state before re-validating
    form.querySelectorAll('.field-error').forEach(el => el.classList.remove('field-error'));
    form.querySelectorAll('.label-error').forEach(el => el.remove());

    form.querySelectorAll('[required]').forEach(field => {
      const val = field.value.trim();
      if (!val) {
        // Empty required field
        markError(field);
        valid = false;
      } else if (field.type === 'email' && !isValidEmail(val)) {
        // Non-empty email field that doesn't match the email pattern
        markError(field, 'Please enter a valid email');
        valid = false;
      }
    });

    return valid;
  }

  /**
   * Marks a form field as invalid by adding .field-error to its group
   * and appending an inline error message span next to its label.
   * @param {HTMLElement} field - the invalid input/select/textarea element
   * @param {string} [message] - custom error message; defaults to a generic prompt
   */
  function markError(field, message) {
    const group = field.closest('.form-group');
    if (!group) return;

    group.classList.add('field-error');  // Triggers red border styling via global.css

    // Add an inline error message next to the label (only once per field)
    const label = group.querySelector('.form-label');
    if (label && !label.querySelector('.label-error')) {
      const errSpan = document.createElement('span');
      errSpan.className = 'label-error';
      errSpan.textContent = message || '← This field needs to be complete';
      label.appendChild(errSpan);
    }
  }

  /**
   * Tests whether a string is a plausible email address.
   * Uses a simple regex: requires characters before @, a domain, and a TLD.
   * @param {string} email
   * @returns {boolean}
   */
  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function init() {
    document.querySelectorAll('form[data-validate]').forEach(form => {

      // On submit: validate the whole form; redirect on success
      form.addEventListener('submit', function (e) {
        e.preventDefault();  // Always prevent native submission
        if (validateForm(this)) {
          const redirect = this.dataset.redirect;
          if (redirect) {
            window.location.href = redirect;  // Navigate to success/confirmation page
          }
        }
      });

      // Live validation on blur: clears error state once a field is corrected
      form.querySelectorAll('[required]').forEach(field => {
        field.addEventListener('blur', function () {
          const group = this.closest('.form-group');
          if (!group) return;
          if (this.value.trim()) {
            // Field now has a value — remove the error state
            group.classList.remove('field-error');
            group.querySelectorAll('.label-error').forEach(el => el.remove());
          }
        });
      });
    });
  }

  // Run init after the DOM is fully parsed; if already parsed, run immediately
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();