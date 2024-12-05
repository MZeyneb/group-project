import BASE_URL from "../constants/api.js";

const username = document.querySelector("#register-username");
const password = document.querySelector("#register-password");
const email = document.querySelector("#register-email");
const registerForm = document.querySelector("#register-form");
let totalDAta = null;

// Function to validate the password
function validatePassword(password) {
  const minLength = 8;
  const hasUppercase = /[A-Z]/.test(password);  // Check if the password contains at least one uppercase letter
  const hasNumber = /[0-9]/.test(password);  // Check if the password contains at least one number
  
  return password.length >= minLength && hasUppercase && hasNumber;
}

async function fetchData(endpoint) {
  const response = await fetch(`${BASE_URL}/${endpoint}`);
  const data = await response.json();
  totalDAta = data;
  return totalDAta;
}

registerForm.addEventListener("submit", async function (e) {
  e.preventDefault();
  const name_value = username.value.trim();
  const email_value = email.value.trim();
  const password_value = password.value.trim();

  // Validate the password
  if (!validatePassword(password_value)) {
    Swal.fire({
      position: "center",
      icon: "error",
      title: "Password must be at least 8 characters long, contain an uppercase letter, and include a number.",
      showConfirmButton: false,
      timer: 1500,
    });
    return; // Prevent form submission
  }

  await fetchData("teachers");

  const findAccount = totalDAta.find(
    (q) => q.username === name_value || q.email === email_value
  );

  if (!findAccount) {
    const user = {
      id: Date.now(),
      name: name_value,
      email: email_value,
      password: password_value,
      Islogged: false,
    };

    fetch(`${BASE_URL}/teachers`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => {
        if (res.ok) {
          registerForm.reset();
          fetchData("teachers");
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Hesabınız başarıyla oluşturuldu! Tebrikler!",
            showConfirmButton: false,
            timer: 1500,
          }).then(() => {
            window.location.replace("login_user.html");
          });
        }
      })
      .catch((err) => console.error("Kullanıcı ekleme hatası:", err));
  } else {
    Swal.fire({
      position: "center",
      icon: "error",
      title: "Girdiğiniz e-posta veya kullanıcı adı zaten kullanılıyor!",
      showConfirmButton: false,
      timer: 1500,
    });
  }
});
