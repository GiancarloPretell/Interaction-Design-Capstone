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
 *   - Fields with type="email" must match a valid email pattern
 *   - Fields with type="tel" must match a valid phone number pattern
 *   - Fields with type="text" used for name must contain a full name (2+ words)
 *
 * On success: shows a 4-second loading overlay, then redirects to the URL
 * specified in the form's data-redirect attribute
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
    form
      .querySelectorAll(".field-error")
      .forEach((el) => el.classList.remove("field-error"));
    form.querySelectorAll(".label-error").forEach((el) => el.remove());

    form.querySelectorAll("[required]").forEach((field) => {
      const val = field.value.trim();

      if (!val) {
        // Empty required field
        markError(field);
        valid = false;
      } else if (field.type === "email" && !isValidEmail(val)) {
        markError(field, "Please enter a valid email address");
        valid = false;
      } else if (field.type === "tel" && !isValidPhone(val)) {
        markError(field, "Please enter a valid phone number");
        valid = false;
      } else if (
        field.type === "text" &&
        isNameField(field) &&
        !isValidName(val)
      ) {
        markError(field, "Please enter your first and last name");
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
    const group = field.closest(".form-group");
    if (!group) return;

    group.classList.add("field-error"); // Triggers red border styling via global.css

    // Add an inline error message next to the label (only once per field)
    const label = group.querySelector(".form-label");
    if (label && !label.querySelector(".label-error")) {
      const errSpan = document.createElement("span");
      errSpan.className = "label-error";
      errSpan.textContent = message;
      label.appendChild(errSpan);
    }
  }

  /**
   * Tests whether a string is a valid email address.
   * Requires characters before @, a domain, and a TLD.
   * @param {string} email
   * @returns {boolean}
   */
  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email);
  }

  /**
   * Tests whether a string is a plausible phone number.
   * Accepts formats like: (203) 432-2606, 203-432-2606, +12034322606, 2034322606
   * Must contain 7–15 digits after stripping formatting characters.
   * @param {string} phone
   * @returns {boolean}
   */
  function isValidPhone(phone) {
    const digits = phone.replace(/[\s\-().+]/g, "");
    return /^\d{7,15}$/.test(digits);
  }

  /**
   * Detects whether a text input is a name field by checking its
   * placeholder or the text content of its associated label.
   * @param {HTMLElement} field
   * @returns {boolean}
   */
  function isNameField(field) {
    const placeholder = (field.placeholder || "").toLowerCase();
    const group = field.closest(".form-group");
    const labelText = group
      ? (group.querySelector(".form-label") || {}).textContent || ""
      : "";
    return (
      placeholder.includes("name") || labelText.toLowerCase().includes("name")
    );
  }

  /**
   * Tests whether a string looks like a full name.
   * Requires at least two words made up of letters, hyphens, or apostrophes
   * (handles names like O'Brien or Mary-Jane).
   * @param {string} name
   * @returns {boolean}
   */
  function isValidName(name) {
    return /^[a-zA-Z'-]+(\s+[a-zA-Z'-]+)+$/.test(name);
  }

  /**
   * Shows the loading overlay and redirects after a 4-second delay.
   * Looks for an existing .loading-overlay in the DOM; if none is found,
   * it creates one dynamically so the feature works even without the HTML stub.
   * @param {string} url - the redirect destination
   */
  function showLoadingAndRedirect(url) {
    let overlay = document.querySelector(".loading-overlay");

    // Create the overlay on the fly if it isn't already in the HTML
    if (!overlay) {
      overlay = document.createElement("div");
      overlay.className = "loading-overlay";

      const spinner = document.createElement("div");
      spinner.className = "loader";

      overlay.appendChild(spinner);
      document.body.appendChild(overlay);
    }

    // Make sure it's visible (remove .hidden if present)
    overlay.classList.remove("hidden");

    // Wait 4 seconds, then navigate
    setTimeout(function () {
      window.location.href = url;
    }, 4000);
  }

  function init() {
    document.querySelectorAll("form[data-validate]").forEach((form) => {
      // On submit: validate the whole form; show loader then redirect on success
      form.addEventListener("submit", function (e) {
        e.preventDefault(); // Always prevent native submission
        if (validateForm(this)) {
          const redirect = this.dataset.redirect;
          if (redirect) {
            showLoadingAndRedirect(redirect); // 4-second spinner before navigation
          }
        }
      });

      // Live validation on blur: clears error state once a field is corrected
      form.querySelectorAll("[required]").forEach((field) => {
        field.addEventListener("blur", function () {
          const group = this.closest(".form-group");
          if (!group) return;

          const val = this.value.trim();

          if (!val) return; // Still empty — leave the error in place

          let fieldValid = true;

          if (this.type === "email" && !isValidEmail(val)) fieldValid = false;
          if (this.type === "tel" && !isValidPhone(val)) fieldValid = false;
          if (this.type === "text" && isNameField(this) && !isValidName(val))
            fieldValid = false;

          if (fieldValid) {
            // Field is now correct — clear the error state
            group.classList.remove("field-error");
            group.querySelectorAll(".label-error").forEach((el) => el.remove());
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
