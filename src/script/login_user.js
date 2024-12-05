import BASE_URL from "../constants/api.js";
import { endpoints } from "../constants/api.js";

const loginUsername = document.querySelector("#login-username");
const loginPassword = document.querySelector("#login-password");
const loginButton = document.querySelector("#login-btn");

loginButton.addEventListener("click", async function (e) {
  e.preventDefault();

  const username_value = loginUsername.value.trim();
  const password_value = loginPassword.value.trim();

  if (username_value && password_value) {
    const students = await fetchData("students");

    const findAccount = students.find(
      (student) =>
        student.username === username_value &&
        student.password === password_value
    );

    if (findAccount) {

      Swal.fire({
        position: "center",
        icon: "success",
        title: "Giriş Başarılı!",
        showConfirmButton: false,
        timer: 1500,
      }).then(() => {

        window.location.replace("register_user.html"); 
      });
    } else {

      Swal.fire({
        position: "center",
        icon: "error",
        title: "Kullanıcı adı veya şifre hatalı!",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  } else {
    Swal.fire({
      position: "center",
      icon: "error",
      title: "Lütfen tüm alanları doldurun!",
      showConfirmButton: false,
      timer: 1500,
    });
  }
});


async function fetchData(endpoint) {
  try {
    const response = await fetch(`${BASE_URL}/${endpoint}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Veri alma hatası:", error);
    return [];
  }
}
