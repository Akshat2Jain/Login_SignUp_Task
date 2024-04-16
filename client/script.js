const signupForm = document.getElementById("signup-form");

signupForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const username = e.target.username.value;
  const gender = e.target.gender.value;
  const email = e.target.email.value;
  const password = e.target.password.value;
  const confirmPassword = e.target.confirmPassword.value;
  console.log("cicked", email, password, confirmPassword, username, gender);
  if (password !== confirmPassword) {
    alert("Passwords do not match");
    return;
  }
  try {
    const res = await fetch("http://localhost:8080/user/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, email, gender, password }),
    });
    const response = await res.json();
    if (res.status === 200) {
      alert(response.msg);
      window.location.href = "/client/login.html";
    } else {
      console.log(error);
      throw new Error("User registration failed");
    }
  } catch (error) {
    console.error(err);
    alert("User login failed");
  }
});
