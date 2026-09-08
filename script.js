// ==========================================================================
// 1. DOM Element References
// ==========================================================================
const form = document.getElementById("contactForm");
const fullNameInput = document.getElementById("fullName");
const emailInput = document.getElementById("email");
const messageInput = document.getElementById("message");

const nameError = document.getElementById("nameError");
const emailError = document.getElementById("emailError");
const messageError = document.getElementById("messageError");
const successMessage = document.getElementById("successMessage");

// Regex for strict standard email validation
// Structure: [text] @ [domain] . [top-level domain (2+ chars)]
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

// ==========================================================================
// 2. Helper Functions for Clean UI Updates
// ==========================================================================

// Display error message and apply red border class
function showError(inputElement, errorElement, message) {
    errorElement.textContent = message;
    inputElement.classList.add("invalid-input");
}

// Clear error message and remove red border class
function clearError(inputElement, errorElement) {
    errorElement.textContent = "";
    inputElement.classList.remove("invalid-input");
}

// Clear all input error styles and text
function clearAllErrors() {
    clearError(fullNameInput, nameError);
    clearError(emailInput, emailError);
    clearError(messageInput, messageError);
}

// ==========================================================================
// 3. Core Validation Logic
// ==========================================================================

function validateForm() {
    let isValid = true;
    clearAllErrors();

    // 1. Name Validation: Non-empty and at least 2 characters
    const nameValue = fullNameInput.value.trim();
    if (nameValue === "") {
        showError(fullNameInput, nameError, "Full name is required.");
        isValid = false;
    } else if (nameValue.length < 2) {
        showError(fullNameInput, nameError, "Name must be at least 2 characters.");
        isValid = false;
    }

    // 2. Email Validation: Non-empty and matching regular expression
    const emailValue = emailInput.value.trim();
    if (emailValue === "") {
        showError(emailInput, emailError, "Email address is required.");
        isValid = false;
    } else if (!emailRegex.test(emailValue)) {
        showError(emailInput, emailError, "Please enter a valid email address.");
        isValid = false;
    }

    // 3. Message Validation: Non-empty and at least 10 characters
    const messageValue = messageInput.value.trim();
    if (messageValue === "") {
        showError(messageInput, messageError, "Message cannot be empty.");
        isValid = false;
    } else if (messageValue.length < 10) {
        showError(
            messageInput,
            messageError,
            "Message must be at least 10 characters.",
        );
        isValid = false;
    }

    return isValid;
}

// ==========================================================================
// 4. Real-time Input Clearing (UX Enhancement)
// ==========================================================================
// Fresher Tip: Clearing errors live as the user types improves accessibility
// and usability instead of waiting for re-submission.
fullNameInput.addEventListener("input", () =>
    clearError(fullNameInput, nameError),
);
emailInput.addEventListener("input", () => clearError(emailInput, emailError));
messageInput.addEventListener("input", () =>
    clearError(messageInput, messageError),
);

// ==========================================================================
// 5. Submit Event Handler
// ==========================================================================
form.addEventListener("submit", (event) => {
    // Prevent default HTTP page reload upon submit
    event.preventDefault();

    // Hide any existing success message on new submit attempt
    successMessage.style.display = "none";

    // Run validation
    if (validateForm()) {
        // Show success feedback
        successMessage.style.display = "block";

        // Reset form fields
        form.reset();

        // Auto-hide success message after 5 seconds
        setTimeout(() => {
            successMessage.style.display = "none";
        }, 5000);
    }
});
