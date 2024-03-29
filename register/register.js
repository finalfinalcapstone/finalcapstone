"use strict";

const registerForm = document.querySelector("#registerForm");

// register
registerForm.onsubmit = function (event) {
  // Prevent the form from refreshing the page,
  // as it will do by default when the Submit event is triggered:
  event.preventDefault();

  // make sure two password fields are the same
  if (registerForm.password.value !== registerForm.confirmPassword.value) {
    return alert("passwords must match");
}

const registerData = {
    username: registerForm.username.value,
    password: registerForm.password.value,
    confirmPassword: registerForm.confirmPassword.value,
    role: registerForm.role.value,
};

  // Disables the button after the form has been submitted already:
  registerForm.registerButton.disabled = true;

  // Time to actually process the register using the function from auth.js!
  register(registerData);
};