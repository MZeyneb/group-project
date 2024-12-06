import BASE_URL from "../constants/api.js";
import { endpoints } from "../constants/api.js";

const username = document.querySelector("#register-username");
const password = document.querySelector("#register-password");
const email = document.querySelector("#register-email");
const inputFile = document.querySelector("#input_file");
const registerForm = document.querySelector("#register-form");

let totalData = null;

// Verileri API'den almak için genel bir fonksiyon
async function fetchData(endpoint) {
  try {
    const response = await fetch(`${BASE_URL}/${endpoint}`);
    const data = await response.json();
    totalData = data;
    return totalData;
  } catch (error) {
    console.error("Veri alma hatası:", error);
    return [];
  }
}

// Şifre doğrulama fonksiyonu
function validatePassword(password) {
  const regex = /^(?=.*[A-Z])(?=.*[0-9]).{8,}$/;
  return regex.test(password);
}

// Form gönderim işlemi
registerForm.addEventListener("submit", async function (e) {
  e.preventDefault();
  const nameValue = username.value.trim();
  const emailValue = email.value.trim();
  const passwordValue = password.value.trim();
  const file = inputFile ? inputFile.files[0] : null;

  // Şifre doğrulama
  if (!validatePassword(passwordValue)) {
    Swal.fire({
      position: "center",
      icon: "error",
      title: "Şifre en az 8 karakter, bir büyük harf ve bir rakam içermelidir.",
      showConfirmButton: true,
    });
    return;
  }

  // Öğretmen verilerini çek
  await fetchData("teachers");

  // Eşleşen bir kullanıcı var mı kontrol et
  const findAccount = totalData.find(
    (q) => q.username === nameValue || q.email === emailValue
  );

  if (!findAccount) {
    // Yeni kullanıcı nesnesi oluştur
    const user = {
      id: Date.now(),
      name: nameValue,
      email: emailValue,
      password: passwordValue,
      isLogged: false,
      profileImage: file ? URL.createObjectURL(file) : "",
    };

    // Yeni öğretmen kaydı ekle
    fetch(`${BASE_URL}/teachers`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => {
        if (res.ok) {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Hesabınız başarıyla oluşturuldu! Tebrikler!",
            showConfirmButton: false,
            timer: 3000,
          }).then(() => {
            window.location.href = "teacher_login.html";
          });
          registerForm.reset();
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

// Test için eklenen buton
const btn = document.querySelector(".btn");

if (btn) {
  btn.addEventListener("click", function () {
    Swal.fire({
      title: "Error!",
      text: "Do you want to continue",
      icon: "error",
      confirmButtonText: "Cool",
    });
  });
}
