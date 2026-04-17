/**
 * form-validation.js — Real-time form validation + helpful inline feedback
 *
 * Features:
 * - Validates fields on input, change, and blur
 * - Shows inline error messages next to the related label
 * - Clears errors as soon as the field is corrected
 * - Shows success feedback for valid fields
 * - Prevents submit until all required fields are valid
 * - Disables the submit button and shows a loading state on success
 */
(function () {
  function getFieldValue(field) {
    return (field.value || "").trim();
  }

  function getGroup(field) {
    return field.closest(".form-group");
  }

  function getLabel(field) {
    const group = getGroup(field);
    return group ? group.querySelector(".form-label") : null;
  }

  function getPlainLabelText(field) {
    const label = getLabel(field);
    if (!label) return "This field";
    const clone = label.cloneNode(true);
    clone
      .querySelectorAll(".label-error, .label-success, .required")
      .forEach((el) => el.remove());
    return clone.textContent.replace(/\s+/g, " ").trim() || "This field";
  }

  function fieldTitle(field) {
    return getPlainLabelText(field).replace(/[*:]/g, "").trim();
  }

  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email);
  }

  function isValidPhone(phone) {
    const digits = phone.replace(/[^\d]/g, "");
    return /^\d{10,15}$/.test(digits);
  }

  function isNameField(field) {
    const text =
      `${field.placeholder || ""} ${fieldTitle(field)}`.toLowerCase();
    return text.includes("name");
  }

  function isValidName(name) {
    return /^[a-zA-Z'-]+(\s+[a-zA-Z'-]+)+$/.test(name);
  }

  function isSelectField(field) {
    return field.tagName === "SELECT";
  }

  function isConsentField(field) {
    return fieldTitle(field).toLowerCase().includes("consent");
  }

  function getRequiredMessage(field) {
    const title = fieldTitle(field);

    if (field.type === "email") return "Please enter your email address.";
    if (field.type === "tel")
      return "Please enter your phone number, including area code.";
    if (isSelectField(field)) {
      if (/program/i.test(title)) return "Please select a program.";
      if (/event/i.test(title)) return "Please select an event.";
      if (/time slot/i.test(title)) return "Please select a time slot.";
      if (/resume/i.test(title)) return "Please confirm your resume upload.";
      if (/portfolio/i.test(title))
        return "Please confirm your portfolio upload.";
      if (/enrolled/i.test(title))
        return "Please choose whether you are currently enrolled at Yale.";
      if (isConsentField(field))
        return "Please choose whether you consent to data processing.";
      return `Please complete ${title.toLowerCase()}.`;
    }
    if (isNameField(field)) return "Please enter your first and last name.";
    return `Please enter ${title.toLowerCase()}.`;
  }

  function getSuccessMessage(field) {
    const title = fieldTitle(field);
    if (field.type === "email") return "Email looks good.";
    if (field.type === "tel") return "Phone number looks good.";
    if (isNameField(field)) return "Full name looks good.";
    if (isSelectField(field)) return `${title} selected.`;
    return "Looks good.";
  }

  function validateField(field) {
    const value = getFieldValue(field);

    if (field.required && !value) {
      return { valid: false, message: getRequiredMessage(field) };
    }

    if (!value) {
      return { valid: true, message: "" };
    }

    if (field.type === "email" && !isValidEmail(value)) {
      return {
        valid: false,
        message: "Enter a valid email address, like name@example.com.",
      };
    }

    if (field.type === "tel" && !isValidPhone(value)) {
      return {
        valid: false,
        message: "Enter a valid phone number with 10 to 15 digits.",
      };
    }

    if (field.type === "text" && isNameField(field) && !isValidName(value)) {
      return {
        valid: false,
        message: "Enter your first and last name.",
      };
    }

    if (isConsentField(field) && value.toLowerCase() !== "yes") {
      return {
        valid: false,
        message: "You must select Yes to continue with this submission.",
      };
    }

    return { valid: true, message: getSuccessMessage(field) };
  }

  function removeStatus(label) {
    if (!label) return;
    label
      .querySelectorAll(".label-error, .label-success")
      .forEach((el) => el.remove());
  }

  function setStatus(field, type, message) {
    const group = getGroup(field);
    const label = getLabel(field);
    if (!group || !label) return;

    removeStatus(label);
    group.classList.remove("field-error", "field-success");
    field.removeAttribute("aria-invalid");

    if (!message) return;

    const status = document.createElement("span");
    status.className = type === "error" ? "label-error" : "label-success";
    status.textContent = message;
    label.appendChild(status);

    if (type === "error") {
      group.classList.add("field-error");
      field.setAttribute("aria-invalid", "true");
    } else {
      group.classList.add("field-success");
    }
  }

  function validateAndRenderField(field, options) {
    const settings = options || {};
    const result = validateField(field);
    const value = getFieldValue(field);

    if (!result.valid) {
      setStatus(field, "error", result.message);
      return false;
    }

    if (value && settings.showSuccess !== false) {
      setStatus(field, "success", result.message);
    } else {
      const group = getGroup(field);
      const label = getLabel(field);
      if (group) group.classList.remove("field-error", "field-success");
      if (label) removeStatus(label);
      field.removeAttribute("aria-invalid");
    }

    return true;
  }

  function validateForm(form) {
    let valid = true;
    let firstInvalidField = null;

    form.querySelectorAll("[required]").forEach((field) => {
      const fieldValid = validateAndRenderField(field, { showSuccess: true });
      if (!fieldValid) {
        valid = false;
        if (!firstInvalidField) firstInvalidField = field;
      }
    });

    if (!valid && firstInvalidField) {
      firstInvalidField.focus();
    }

    return valid;
  }

  function showLoadingAndRedirect(form, url) {
    let overlay = document.querySelector(".loading-overlay");
    const submitButton = form.querySelector('button[type="submit"]');

    if (submitButton) {
      submitButton.disabled = true;
      submitButton.dataset.originalText = submitButton.textContent;
      submitButton.textContent = "Submitting...";
      submitButton.classList.add("is-loading");
    }

    if (!overlay) {
      overlay = document.createElement("div");
      overlay.className = "loading-overlay";

      const spinner = document.createElement("div");
      spinner.className = "loader";

      const text = document.createElement("p");
      text.className = "loading-text";
      text.textContent = "Submitting your form...";

      overlay.appendChild(spinner);
      overlay.appendChild(text);
      document.body.appendChild(overlay);
    }

    overlay.classList.remove("hidden");

    setTimeout(function () {
      window.location.href = url;
    }, 1500);
  }

  function bindRealtimeValidation(form) {
    form.querySelectorAll("[required]").forEach((field) => {
      const handler = function () {
        validateAndRenderField(field, { showSuccess: true });
      };

      field.addEventListener("blur", handler);

      if (isSelectField(field)) {
        field.addEventListener("change", handler);
      } else {
        field.addEventListener("input", handler);
      }
    });
  }

  function init() {
    document.querySelectorAll("form[data-validate]").forEach((form) => {
      form.setAttribute("novalidate", "novalidate");
      bindRealtimeValidation(form);

      form.addEventListener("submit", function (e) {
        e.preventDefault();
        if (validateForm(form)) {
          const redirect = form.dataset.redirect;
          if (redirect) {
            showLoadingAndRedirect(form, redirect);
          }
        }
      });
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
