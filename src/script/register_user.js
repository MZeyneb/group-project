import BASE_URL from "../constants/api.js";
import { endpoints } from "../constants/api.js";

const username = document.querySelector("#register-username");
const password = document.querySelector("#register-password");
const email = document.querySelector("#register-email");
const inputFile = document.querySelector("#input_file");
const registerForm = document.querySelector("#register-form");

let totalDAta = null;

async function fetchData(endpoint) {
  try {
    const response = await fetch(`${BASE_URL}/${endpoint}`);
    const data = await response.json();
    totalDAta = data;
    return totalDAta;
  } catch (error) {
    console.error("Veri alma hatası:", error);
    return [];
  }
}

function validatePassword(password) {
  const regex = /^(?=.*[A-Z])(?=.*[0-9]).{8,}$/;
  return regex.test(password);
}

registerForm.addEventListener("submit", async function (e) {
  e.preventDefault();
  const name_value = username.value.trim();
  const email_value = email.value.trim();
  const password_value = password.value.trim();
  const file = inputFile.files[0];

  if (!validatePassword(password_value)) {
    Swal.fire({
      position: "center",
      icon: "error",
      title: "Şifre en az 8 karakter, bir büyük harf ve bir rakam içermelidir.",
      showConfirmButton: true,
    });
    return; 
  }

  await fetchData("students");

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
      profileImage: file ? URL.createObjectURL(file) : "",
    };
    fetch(`${BASE_URL}/students`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => {
        if (res.ok) {
  
          registerForm.reset(); 
          
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Hesabınız başarıyla oluşturuldu! Tebrikler!",
            showConfirmButton: false,
            timer: 3000, 
          }).then(() => {
            window.location.href = "login_user.html";
          });
          
        } else {
          Swal.fire({
            position: "center",
            icon: "error",
            title: "Kullanıcı oluşturulurken bir hata oluştu.",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      })
      .catch((err) => {
        Swal.fire({
          position: "center",
          icon: "error",
          title: "Kullanıcı ekleme hatası. Lütfen tekrar deneyin.",
          showConfirmButton: false,
          timer: 1500,
        });
      });
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

console.log(Swal);

const btn = document.querySelector(".btn");

btn.addEventListener("click", function () {
  Swal.fire({
    title: "Error!",
    text: "Do you want to continue",
    icon: "error",
    confirmButtonText: "Cool",
  });
});
