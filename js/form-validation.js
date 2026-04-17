/**
 * form-validation.js — Real-time form validation + helpful inline feedback
 *
 * Features:
 * - Validates fields on input, change, and blur
 * - Shows inline error messages next to the related label
 * - Clears errors as soon as the field is corrected
 * - Shows success feedback for valid fields
 * - File inputs: enforces PDF-only and 10 MB max, validates on change
 * - Prevents submit until all required fields are valid
 * - Disables the submit button and shows a loading state on success
 */
(function () {
  var MAX_FILE_BYTES = 10 * 1024 * 1024; // 10 MB

  function getFieldValue(field) {
    return (field.value || "").trim();
  }

  function getGroup(field) {
    return field.closest(".form-group");
  }

  function getLabel(field) {
    var group = getGroup(field);
    return group ? group.querySelector(".form-label") : null;
  }

  function getPlainLabelText(field) {
    var label = getLabel(field);
    if (!label) return "This field";
    var clone = label.cloneNode(true);
    clone
      .querySelectorAll(".label-error, .label-success, .required")
      .forEach(function (el) {
        el.remove();
      });
    return clone.textContent.replace(/\s+/g, " ").trim() || "This field";
  }

  function fieldTitle(field) {
    return getPlainLabelText(field).replace(/[*:]/g, "").trim();
  }

  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email);
  }

  function isValidPhone(phone) {
    var digits = phone.replace(/[^\d]/g, "");
    return /^\d{10,15}$/.test(digits);
  }

  function isNameField(field) {
    var text = (
      (field.placeholder || "") +
      " " +
      fieldTitle(field)
    ).toLowerCase();
    return text.includes("name");
  }

  function isValidName(name) {
    return /^[a-zA-Z'-]+(\s+[a-zA-Z'-]+)+$/.test(name);
  }

  function isSelectField(field) {
    return field.tagName === "SELECT";
  }

  function isFileField(field) {
    return field.type === "file";
  }

  function isConsentField(field) {
    return fieldTitle(field).toLowerCase().includes("consent");
  }

  // -------------------------------------------------------------------------
  //  File validation — PDF type + 10 MB cap
  // -------------------------------------------------------------------------
  function validateFileField(field) {
    var title = fieldTitle(field);

    // No file chosen yet
    if (!field.files || field.files.length === 0) {
      if (field.required) {
        return {
          valid: false,
          message: "Please upload your " + title.toLowerCase() + " as a PDF.",
        };
      }
      return { valid: true, message: "" };
    }

    var file = field.files[0];

    // Type check — accept attribute alone can be bypassed, so we verify here too
    var isPdf =
      file.type === "application/pdf" ||
      file.name.toLowerCase().endsWith(".pdf");

    if (!isPdf) {
      return {
        valid: false,
        message:
          "Only PDF files are accepted. Please choose a .pdf file for your " +
          title.toLowerCase() +
          ".",
      };
    }

    // Size check
    if (file.size > MAX_FILE_BYTES) {
      var sizeMB = (file.size / (1024 * 1024)).toFixed(1);
      return {
        valid: false,
        message:
          "Your file is " +
          sizeMB +
          " MB — the maximum allowed size is 10 MB. Please compress or re-export your " +
          title.toLowerCase() +
          ".",
      };
    }

    return {
      valid: true,
      message: title + " uploaded successfully.",
    };
  }

  // -------------------------------------------------------------------------
  //  General field validation dispatcher
  // -------------------------------------------------------------------------
  function getRequiredMessage(field) {
    var title = fieldTitle(field);

    if (field.type === "email") return "Please enter your email address.";
    if (field.type === "tel")
      return "Please enter your phone number, including area code.";
    if (isSelectField(field)) {
      if (/program/i.test(title)) return "Please select a program.";
      if (/event/i.test(title)) return "Please select an event.";
      if (/time slot/i.test(title)) return "Please select a time slot.";
      if (isConsentField(field))
        return "Please choose whether you consent to data processing.";
      return "Please complete " + title.toLowerCase() + ".";
    }
    if (isNameField(field)) return "Please enter your first and last name.";
    return "Please enter " + title.toLowerCase() + ".";
  }

  function getSuccessMessage(field) {
    var title = fieldTitle(field);
    if (field.type === "email") return "Email looks good.";
    if (field.type === "tel") return "Phone number looks good.";
    if (isNameField(field)) return "Full name looks good.";
    if (isSelectField(field)) return title + " selected.";
    return "Looks good.";
  }

  function validateField(field) {
    // Delegate file fields to their own validator
    if (isFileField(field)) {
      return validateFileField(field);
    }

    var value = getFieldValue(field);

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

  // -------------------------------------------------------------------------
  //  Status rendering
  // -------------------------------------------------------------------------
  function removeStatus(label) {
    if (!label) return;
    label
      .querySelectorAll(".label-error, .label-success")
      .forEach(function (el) {
        el.remove();
      });
  }

  function setStatus(field, type, message) {
    var group = getGroup(field);
    var label = getLabel(field);
    if (!group || !label) return;

    removeStatus(label);
    group.classList.remove("field-error", "field-success");
    field.removeAttribute("aria-invalid");

    if (!message) return;

    var status = document.createElement("span");
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
    var settings = options || {};
    var result = validateField(field);

    // For file fields, treat "has a file" as having a value
    var hasValue = isFileField(field)
      ? field.files && field.files.length > 0
      : !!getFieldValue(field);

    if (!result.valid) {
      setStatus(field, "error", result.message);
      return false;
    }

    if (hasValue && settings.showSuccess !== false) {
      setStatus(field, "success", result.message);
    } else {
      var group = getGroup(field);
      var label = getLabel(field);
      if (group) group.classList.remove("field-error", "field-success");
      if (label) removeStatus(label);
      field.removeAttribute("aria-invalid");
    }

    return true;
  }

  function validateForm(form) {
    var valid = true;
    var firstInvalidField = null;

    form.querySelectorAll("[required]").forEach(function (field) {
      var fieldValid = validateAndRenderField(field, { showSuccess: true });
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

  // -------------------------------------------------------------------------
  //  Loading overlay + redirect
  // -------------------------------------------------------------------------
  function showLoadingAndRedirect(form, url) {
    var overlay = document.querySelector(".loading-overlay");
    var submitButton = form.querySelector('button[type="submit"]');

    if (submitButton) {
      submitButton.disabled = true;
      submitButton.dataset.originalText = submitButton.textContent;
      submitButton.textContent = "Submitting...";
      submitButton.classList.add("is-loading");
    }

    if (!overlay) {
      overlay = document.createElement("div");
      overlay.className = "loading-overlay";

      var spinner = document.createElement("div");
      spinner.className = "loader";

      var text = document.createElement("p");
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

  // -------------------------------------------------------------------------
  //  Real-time event binding
  // -------------------------------------------------------------------------
  function bindRealtimeValidation(form) {
    form.querySelectorAll("[required]").forEach(function (field) {
      var handler = function () {
        validateAndRenderField(field, { showSuccess: true });
      };

      // All fields validate on blur
      field.addEventListener("blur", handler);

      if (isFileField(field)) {
        // File inputs only fire a meaningful event on change
        field.addEventListener("change", handler);
      } else if (isSelectField(field)) {
        field.addEventListener("change", handler);
      } else {
        field.addEventListener("input", handler);
      }
    });
  }

  // -------------------------------------------------------------------------
  //  Init
  // -------------------------------------------------------------------------
  function init() {
    document.querySelectorAll("form[data-validate]").forEach(function (form) {
      form.setAttribute("novalidate", "novalidate");
      bindRealtimeValidation(form);

      form.addEventListener("submit", function (e) {
        e.preventDefault();
        if (validateForm(form)) {
          var redirect = form.dataset.redirect;
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
