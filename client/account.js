const token = document.cookie.includes("jwt");

if (!token) {
  alert("Please Login First");
  window.location.href = "/client/login.html";
} else {
  const user = localStorage.getItem("user");
  const showUser = JSON.parse(user);
  document.getElementById("name").textContent = showUser.username;
  document.getElementById("email").textContent = showUser.email;
  document.getElementById("gender").textContent = showUser.gender;
}

function logout() {
  // Clear local storage
  localStorage.clear();

  // Clear cookie
  document.cookie = "jwt=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

  // Redirect to the login page
  window.location.href = "/client/login.html";
}
