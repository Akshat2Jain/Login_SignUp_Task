const loginForm = document.getElementById("login-form");

loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = e.target.email.value;
  const password = e.target.password.value;
  try {
    const res = await fetch("http://localhost:8080/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    if (res.status == 200) {
      const response = await res.json();
      console.log(response);
      const user = JSON.stringify(response.user);
      localStorage.setItem("user", user);
      alert(response.msg);
      // token expires in 1 hours
      document.cookie = `jwt=${response.token}; path=/; expires=${new Date(
        Date.now() + 3600 * 1000
      ).toUTCString()};`;
      window.location.href = "/client/account.html";
    } else {
      console.log("something went wrong");
    }
  } catch (error) {
    console.log(error);
    // throw new Error("User registration failed");
  }
});
