// console.log("before navbar");
import { NavBar } from "./navbar.js";


import { validateEmail } from "./data.js";


import { CampaignFooter } from "./footer.js";
// console.log("after CampaignFooter");

CampaignFooter();
// console.log("after CampaignFooter");

NavBar();

// console.log("navbar CampaignFooter");

document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("#login-form");
  const emailInput = document.querySelector("#email");
  const passwordInput = document.querySelector("#password");
  const emailMsg = document.querySelector("#email-msg");
  const passwordMsg = document.querySelector("#password-msg");
  const loginMsg = document.querySelector("#login-msg");

  async function checkIfBlocked(email) {
    try {
      const response = await fetch(
        `http://localhost:3001/users?email=${email}`
      );
      const users = await response.json();
      console.log(users);
      
      if (users.length > 0 && users[0].isBlock === true) {
        alert(
          `Your account has been blocked. Reason: ${
            users[0].blockReason || "No reason provided"
          }`
        );
        localStorage.clear();
        window.location.href = "login.html";
        return true;  
      }
      return false; 
    } catch (err) {
      console.error(err);
      return false;
    }
  }

  function validateEmailInput() {
    if (!emailInput.value.trim()) {
      emailInput.classList.add("is-invalid");
      emailInput.classList.remove("is-valid");
      emailMsg.textContent = "Please enter your email";
      emailMsg.classList.add("error");
      return false;
    } else if (!validateEmail(emailInput.value.trim())) {
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
    if (!passwordInput.value.trim()) {
      passwordInput.classList.add("is-invalid");
      passwordInput.classList.remove("is-valid");
      passwordMsg.textContent = "Please enter your password";
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

  emailInput.addEventListener("input", validateEmailInput);
  passwordInput.addEventListener("input", validatePasswordInput);

  [emailInput, passwordInput].forEach((input) => {
    input.addEventListener("blur", () => {
      const msgEl = document.querySelector(`#${input.id}-msg`);
      if (input.classList.contains("is-valid") && msgEl) {
        input.classList.remove("is-invalid");
        msgEl.textContent = "";
        msgEl.classList.remove("error");
      }
    });
  });

 form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const validEmail = validateEmailInput();
  const validPassword = validatePasswordInput();

  if (!validEmail || !validPassword) return;

  const email = emailInput.value.trim();
  const password = passwordInput.value;

  try {
    const response = await fetch(
      `http://localhost:3001/users?email=${email}&password=${password}`
    );

    const users = await response.json();
    console.log(users);

    
    if (users.length === 0) {
      loginMsg.textContent = "Invalid email or password";
      loginMsg.classList.add("error");
      return;
    }

    const user = users[0];

    // 🚫 blocked user
    if (user.isBlock === true) {
      alert(
        `Your account is blocked. Reason: ${
          user.blockReason || "No reason"
        }`
      );
      return;
    }

    // 💾 save data
    localStorage.setItem("userId", user.id);
    localStorage.setItem("userName", user.name);
    localStorage.setItem("role", user.role);
    localStorage.setItem("userIsActive", user.isActive);

    loginMsg.textContent = "Login successful!";
    loginMsg.classList.add("success");

    setTimeout(() => {
      if (user.role === "admin") {
        window.location.href = "admin.html";
      } else {
        window.location.href = "../index.html";
      }
    }, 1000);

  } catch (err) {
    console.error(err);
    loginMsg.textContent = "Server error";
  }
});

});



// form.addEventListener("submit", async (e) => {
//   e.preventDefault();

//   const email = document.querySelector("#email").value.trim();
//   const password = document.querySelector("#password").value;

//   try {
//     const res = await fetch(
//       `http://localhost:3001/users?email=${email}&password=${password}`
//     );

//     const users = await res.json();
//     console.log(users);

//     if (users.length === 0) {
//       alert("Invalid email or password");
//       return;
//     }

//     const user = users[0];

//     localStorage.setItem("user", JSON.stringify(user));

//     alert("Login success");

//     window.location.href = "../index.html";

//   } catch (err) {
//     console.error(err);
//   }
// });
