// console.log("Rfgister");

import { NavBar } from "./navbar.js";
import { validateEmail } from "./data.js";
import { CampaignFooter } from "./footer.js";
CampaignFooter();

NavBar();
console.log("form");
document.addEventListener("DOMContentLoaded", () => {

  console.log("kjfkdjkk");
  
  const form = document.querySelector(".register__form");
  const nameInput = document.querySelector("#name");
  const emailInput = document.querySelector("#email");
  const passwordInput = document.querySelector("#password");
  const confirmpasswordInput = document.querySelector("#confirmpassword");

  const nameMsg = document.querySelector("#name-msg");
  const emailMsg = document.querySelector("#email-msg");
  const passwordMsg = document.querySelector("#password-msg");
  const confirmpasswordMsg = document.querySelector("#confirmpassword-msg");
  const generalMsg = document.querySelector("#message");

  function validateNameInput() {
    const nameValue = nameInput.value.trim();
    let error = "";

    if (nameValue.length < 3) {
      error = "Name must be at least 3 characters";
    } else if (!/^[A-Za-z\s]+$/.test(nameValue)) {
      error = "Name must contain only letters";
    }

    if (error) {
      nameInput.classList.add("is-invalid");
      nameInput.classList.remove("is-valid");
      nameMsg.textContent = error;
      nameMsg.classList.add("error");
      return false;
    } else {
      nameInput.classList.add("is-valid");
      nameInput.classList.remove("is-invalid");
      nameMsg.textContent = "";
      nameMsg.classList.remove("error");
      return true;
    }
  }

  function validateEmailInput() {
    if (!validateEmail(emailInput.value.trim())) {
      emailInput.classList.add("is-invalid");
      emailInput.classList.remove("is-valid");
      emailMsg.textContent = "Enter a valid email";
      emailMsg.classList.add("error");
      return false;
    } else {
      emailInput.classList.add("is-valid");
      emailInput.classList.remove("is-invalid");
      emailMsg.textContent = "";
      emailMsg.classList.remove("error");
      return true;
    }
  }

  function validatePasswordInput() {
    const password = passwordInput.value;
    const errors = [];
    if (password.length < 6) errors.push("at least 6 characters");
    if (!password.includes("@")) errors.push("contain '@'");

    if (errors.length > 0) {
      passwordInput.classList.add("is-invalid");
      passwordInput.classList.remove("is-valid");
      passwordMsg.textContent = "Password must " + errors.join(" and ");
      passwordMsg.classList.add("error");
      return false;
    } else {
      passwordInput.classList.add("is-valid");
      passwordInput.classList.remove("is-invalid");
      passwordMsg.textContent = "";
      passwordMsg.classList.remove("error");
      return true;
    }
  }

  function validateConfirmPasswordInput() {
    if (
      passwordInput.value !== confirmpasswordInput.value ||
      confirmpasswordInput.value === ""
    ) {
      confirmpasswordInput.classList.add("is-invalid");
      confirmpasswordInput.classList.remove("is-valid");
      confirmpasswordMsg.textContent = "Passwords do not match";
      confirmpasswordMsg.classList.add("error");
      return false;
    } else {
      confirmpasswordInput.classList.add("is-valid");
      confirmpasswordInput.classList.remove("is-invalid");
      confirmpasswordMsg.textContent = "";
      confirmpasswordMsg.classList.remove("error");
      return true;
    }
  }

  nameInput.addEventListener("input", validateNameInput);
  emailInput.addEventListener("input", validateEmailInput);
  passwordInput.addEventListener("input", validatePasswordInput);
  confirmpasswordInput.addEventListener("input", validateConfirmPasswordInput);

  [nameInput, emailInput, passwordInput, confirmpasswordInput].forEach(
    (input) => {
      input.addEventListener("blur", () => {
        if (input.classList.contains("is-valid")) {
          input.classList.remove("is-invalid");
          const msgEl = document.querySelector(`#${input.id}-msg`);
          if (msgEl) {
            msgEl.textContent = "";
            msgEl.classList.remove("error");
          }
        }
      });
    }
  );

  form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const validName = validateNameInput();
  const validEmail = validateEmailInput();
  const validPassword = validatePasswordInput();
  const validConfirm = validateConfirmPasswordInput();

  if (!validName || !validEmail || !validPassword || !validConfirm) return;

  const data = {
    name: nameInput.value.trim(),
    email: emailInput.value.trim(),
    password: passwordInput.value,
    role: "user",
    isActive: false,
  };

  console.log(data);

  try {
    const response = await fetch("http://localhost:3001/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    localStorage.setItem("user", JSON.stringify(result));

    generalMsg.textContent = "Registration successful!";
    generalMsg.classList.add("success");

    setTimeout(() => {
      window.location.href = "login.html";
    }, 1000);

  } catch (err) {
    console.error(err);
    generalMsg.textContent = "Server error";
  }
});
});



// document.addEventListener("DOMContentLoaded", () => {
//   console.log("JS WORKING");

//   const form = document.querySelector(".register__form");

//   form.addEventListener("submit", async (e) => {
//     e.preventDefault();
//     console.log("SUBMIT START");

//     const name = document.querySelector("#name").value;
//     const email = document.querySelector("#email").value;
//     const password = document.querySelector("#password").value;

//     try {
//       const res = await fetch("http://localhost:3001/users", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json"
//         },
//         body: JSON.stringify({
//           name,
//           email,
//           password,
//           role: "user",
//           isActive: true
//         })
//       });

//       const data = await res.json();
//       console.log(data);

//       alert("Registered successfully");

//       window.location.href = "login.html";

//     } catch (err) {
//       console.error(err);
//     }
//   });
// });