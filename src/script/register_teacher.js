import BASE_URL from "../constants/api.js";

const username = document.querySelector("#register-username");
const password = document.querySelector("#register-password");
const email = document.querySelector("#register-email");
const registerForm = document.querySelector("#register-form-element"); 
let totalData = null;

function validatePassword(password) {
  const minLength = 8;
  const hasUppercase = /[A-Z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  
  return password.length >= minLength && hasUppercase && hasNumber;
}

async function fetchData(endpoint) {
  try {
    const response = await fetch(`${BASE_URL}/${endpoint}`);
    if (!response.ok) {
      throw new Error('Ошибка при загрузке данных');
    }
    const data = await response.json();
    totalData = data;
    return totalData;
  } catch (error) {
    console.error('Ошибка при выполнении запроса:', error);
  }
}

registerForm.addEventListener("submit", async function (e) {
  e.preventDefault();
  const name_value = username.value.trim();
  const email_value = email.value.trim();
  const password_value = password.value.trim();


  if (!validatePassword(password_value)) {
    Swal.fire({
      position: "center",
      icon: "error",
      title: "Password must be at least 8 characters long, contain an uppercase letter, and include a number.",
      showConfirmButton: false,
      timer: 1500,
    });
    return;
    return;
  }

  await fetchData("teachers");

  const findAccount = totalData.find(
    (q) => q.username === name_value || q.email === email_value
  );

  if (!findAccount) {
    const user = {
      id: Date.now(),
      username: name_value,
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
            title: "Your account succesfully signed up!",
            showConfirmButton: false,
            timer: 1500,
          }).then(() => {
            window.location.replace("teacher_login.html");
          });
        }
      })
      .catch((err) => console.error("Error", err));
  } else {
    Swal.fire({
      position: "center",
      icon: "error",
      title: "Username or Email already taken!",
      showConfirmButton: false,
      timer: 1500,
    });
  }
});

