import BASE_URL from "../constants/api.js";

const loginForm = document.querySelector("#login-form-element");
const loginUsername = document.querySelector("#login-username");
const loginPassword = document.querySelector("#login-password");

// Function to fetch user data
async function fetchData(endpoint) {
  const response = await fetch(`${BASE_URL}/${endpoint}`);
  const data = await response.json();
  return data;
}

loginForm.addEventListener("submit", async function (e) {
  e.preventDefault();

  const usernameOrEmail = loginUsername.value.trim();
  const password = loginPassword.value.trim();

  const users = await fetchData("teachers");

  // Check if the user exists
  const user = users.find(
    (user) =>
      (user.username === usernameOrEmail || user.email === usernameOrEmail) &&
      user.password === password
  );

  if (user) {
    // Update the user as logged in
    fetch(`${BASE_URL}/teachers/${user.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ Islogged: true }),
    })
      .then((res) => {
        if (res.ok) {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Login successful!",
            showConfirmButton: false,
            timer: 1500,
          }).then(() => {
            // window.location.replace("index.html");
            alert("succesfully")
          });
        }
      })
      .catch((err) => console.error("Error", err));
  } else {
    Swal.fire({
      position: "center",
      icon: "error",
      title: "Invalid username/email or password.",
      showConfirmButton: false,
      timer: 1500,
    });
  }
});
