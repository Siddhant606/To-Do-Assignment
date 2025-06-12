document.addEventListener("DOMContentLoaded", function () {
  // Get all necessary elements
  const startOrganizingBtn = document.getElementById("startOrganizingBtn");
  const getStartedTodayBtn = document.getElementById("getStartedTodayBtn");
  const startOrganizingModal = document.getElementById("startOrganizingModal");
  const closeStartOrganizingModal = document.getElementById(
    "closeStartOrganizingModal"
  );
  const startOrganizingForm = document.getElementById("startOrganizingForm");
  const tableBody = document.getElementById("tableBody");
  const thankYouModal = document.getElementById("thankYouModal");
  const closeThankYouModal = document.getElementById("closeThankYouModal");

  // Get elements for login/signup modals
  const loginBtn = document.getElementById("loginBtn");
  const signupBtn = document.getElementById("signupBtn");
  const loginModal = document.getElementById("loginModal");
  const signupModal = document.getElementById("signupModal");
  const closeLoginModal = document.getElementById("closeLoginModal");
  const closeSignupModal = document.getElementById("closeSignupModal");
  const switchToSignup = document.getElementById("switchToSignup");
  const switchToLogin = document.getElementById("switchToLogin");
  const loginForm = document.getElementById("loginForm");
  const signupForm = document.getElementById("signupForm");

  // Function to open a modal
  function openModal(modalElement) {
    modalElement.classList.add("active");
  }

  // Function to close a modal
  function closeModal(modalElement) {
    modalElement.classList.remove("active");
  }

  // Event listeners for "Start Organizing" modal
  if (startOrganizingBtn) {
    startOrganizingBtn.addEventListener("click", () =>
      openModal(startOrganizingModal)
    );
  }
  if (getStartedTodayBtn) {
    getStartedTodayBtn.addEventListener("click", () =>
      openModal(startOrganizingModal)
    );
  }
  if (closeStartOrganizingModal) {
    closeStartOrganizingModal.addEventListener("click", () =>
      closeModal(startOrganizingModal)
    );
  }

  // Handle form submission for "Start Organizing"
  if (startOrganizingForm && tableBody && thankYouModal) {
    startOrganizingForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const name = document.getElementById("orgName").value.trim();
      const email = document.getElementById("orgEmail").value.trim();
      const phone = document.getElementById("orgPhone").value.trim();

      const nameError = document.getElementById("orgNameError");
      const emailError = document.getElementById("orgEmailError");
      const phoneError = document.getElementById("orgPhoneError");
      const formError = document.getElementById("startOrganizingFormError");

      let valid = true;
      nameError.textContent = "";
      emailError.textContent = "";
      phoneError.textContent = "";
      formError.textContent = "";
      nameError.classList.remove("active");
      emailError.classList.remove("active");
      phoneError.classList.remove("active");
      formError.classList.remove("active");

      if (!name) {
        nameError.textContent = "Full Name is required.";
        nameError.classList.add("active");
        valid = false;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!email) {
        emailError.textContent = "Email Address is required.";
        emailError.classList.add("active");
        valid = false;
      } else if (!emailRegex.test(email)) {
        emailError.textContent = "Enter a valid email address.";
        emailError.classList.add("active");
        valid = false;
      }

      const phoneRegex = /^[0-9]{10}$/; // Basic 10-digit phone number validation
      if (!phone) {
        phoneError.textContent = "Phone Number is required.";
        phoneError.classList.add("active");
        valid = false;
      } else if (!phoneRegex.test(phone)) {
        phoneError.textContent = "Enter a valid 10-digit phone number.";
        phoneError.classList.add("active");
        valid = false;
      }

      if (!valid) {
        formError.textContent = "Please correct the errors in the form.";
        formError.classList.add("active");
        return;
      }

      // Add new row to the table
      const timestamp = new Date().toLocaleString();
      const newRow = document.createElement("tr");
      newRow.innerHTML = `
        <td>${name}</td>
        <td>${email}</td>
        <td>${phone}</td>
        <td>${timestamp}</td>
      `;

      // Remove "no submissions" row if present
      const emptyStateRow = tableBody.querySelector(".empty-state");
      if (emptyStateRow) {
        tableBody.removeChild(emptyStateRow.parentNode); // Remove the <tr> containing the empty state
      }
      tableBody.appendChild(newRow);

      // Close organizing modal and show thank you modal
      closeModal(startOrganizingModal);
      openModal(thankYouModal);

      // Reset form
      startOrganizingForm.reset();
    });
  } else {
    console.error(
      "One or more elements for 'Start Organizing' functionality are missing from the DOM."
    );
  }

  // Event listener for closing "Thank You" modal
  if (closeThankYouModal) {
    closeThankYouModal.addEventListener("click", () =>
      closeModal(thankYouModal)
    );
  }

  // Event listeners for Login/Signup modals
  if (loginBtn) {
    loginBtn.addEventListener("click", () => openModal(loginModal));
  }
  if (signupBtn) {
    signupBtn.addEventListener("click", () => openModal(signupModal));
  }
  if (closeLoginModal) {
    closeLoginModal.addEventListener("click", () => closeModal(loginModal));
  }
  if (closeSignupModal) {
    closeSignupModal.addEventListener("click", () => closeModal(signupModal));
  }

  // Switch between Login and Signup modals
  if (switchToSignup && switchToLogin) {
    switchToSignup.addEventListener("click", () => {
      closeModal(loginModal);
      openModal(signupModal);
    });

    switchToLogin.addEventListener("click", () => {
      closeModal(signupModal);
      openModal(loginModal);
    });
  }

  // Basic form validation for Login Form (can be expanded)
  if (loginForm) {
    loginForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const loginEmail = document.getElementById("loginEmail").value.trim();
      const loginPassword = document
        .getElementById("loginPassword")
        .value.trim();
      const loginEmailError = document.getElementById("loginEmailError");
      const loginPasswordError = document.getElementById("loginPasswordError");
      const loginFormError = document.getElementById("loginFormError");

      let valid = true;
      loginEmailError.textContent = "";
      loginPasswordError.textContent = "";
      loginFormError.textContent = "";
      loginEmailError.classList.remove("active");
      loginPasswordError.classList.remove("active");
      loginFormError.classList.remove("active");

      if (!loginEmail) {
        loginEmailError.textContent = "Email is required.";
        loginEmailError.classList.add("active");
        valid = false;
      }
      if (!loginPassword) {
        loginPasswordError.textContent = "Password is required.";
        loginPasswordError.classList.add("active");
        valid = false;
      }

      if (!valid) {
        loginFormError.textContent = "Please correct the errors.";
        loginFormError.classList.add("active");
        return;
      }

      // Simulate successful login
      closeModal(loginModal);
      alert("Login successful!");
      // Here you would typically handle user authentication, e.g., send data to a server
      loginForm.reset();
    });
  }

  // Basic form validation for Signup Form (can be expanded)
  if (signupForm) {
    signupForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const firstName = document.getElementById("firstName").value.trim();
      const lastName = document.getElementById("lastName").value.trim();
      const gender = document.querySelector('input[name="gender"]:checked');
      const language = document.querySelector('input[name="language"]:checked');
      const email = document.getElementById("email").value.trim();
      const password = document.getElementById("password").value.trim();
      const confirmPassword = document
        .getElementById("confirmPassword")
        .value.trim();
      const terms = document.getElementById("terms").checked;

      const firstNameError = document.getElementById("firstNameError");
      const lastNameError = document.getElementById("lastNameError");
      const genderError = document.getElementById("genderError");
      const languageError = document.getElementById("languageError");
      const emailError = document.getElementById("emailError");
      const passwordError = document.getElementById("passwordError");
      const confirmPasswordError = document.getElementById(
        "confirmPasswordError"
      );
      const termsError = document.getElementById("termsError");
      const signupFormError = document.getElementById("signupFormError");

      let valid = true;
      // Reset all error messages
      [
        firstNameError,
        lastNameError,
        genderError,
        languageError,
        emailError,
        passwordError,
        confirmPasswordError,
        termsError,
        signupFormError,
      ].forEach((el) => {
        el.textContent = "";
        el.classList.remove("active");
      });

      if (!firstName) {
        firstNameError.textContent = "First Name is required.";
        firstNameError.classList.add("active");
        valid = false;
      }
      if (!lastName) {
        lastNameError.textContent = "Last Name is required.";
        lastNameError.classList.add("active");
        valid = false;
      }
      if (!gender) {
        genderError.textContent = "Gender is required.";
        genderError.classList.add("active");
        valid = false;
      }
      if (!language) {
        languageError.textContent = "Language is required.";
        languageError.classList.add("active");
        valid = false;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!email) {
        emailError.textContent = "Email Address is required.";
        emailError.classList.add("active");
        valid = false;
      } else if (!emailRegex.test(email)) {
        emailError.textContent = "Enter a valid email address.";
        emailError.classList.add("active");
        valid = false;
      }

      if (password.length < 6) {
        passwordError.textContent = "Password must be at least 6 characters.";
        passwordError.classList.add("active");
        valid = false;
      }
      if (password !== confirmPassword) {
        confirmPasswordError.textContent = "Passwords do not match.";
        confirmPasswordError.classList.add("active");
        valid = false;
      }
      if (!terms) {
        termsError.textContent = "You must agree to the Terms and Conditions.";
        termsError.classList.add("active");
        valid = false;
      }

      if (!valid) {
        signupFormError.textContent = "Please correct the errors in the form.";
        signupFormError.classList.add("active");
        return;
      }

      // Simulate successful signup
      closeModal(signupModal);
      alert("Signup successful! You can now log in.");
      // Here you would typically handle user registration
      signupForm.reset();
    });
  }
});