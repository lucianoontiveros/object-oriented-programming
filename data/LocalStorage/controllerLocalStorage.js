const users = JSON.parse(localStorage.getItem("users")) || {};

// Registro de usuarios en localStorage
const registrationUsers = (users) => {
  localStorage.setItem("users", JSON.stringify(users));
};

export { users, registrationUsers };
