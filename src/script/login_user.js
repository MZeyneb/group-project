import BASE_URL, { endpoints } from "../constants/api.js";

const usernameInput = document.querySelector("#login-username");
const passwordInput = document.querySelector("#login-password");
const loginButton = document.querySelector("#login-btn");

async function fetchUsers() {
  try {
    const response = await fetch(`${BASE_URL}/${endpoints.students}`);
    if (!response.ok) {
      throw new Error("Kullanıcı bilgileri alınamadı.");
    }
    return await response.json();
  } catch (error) {
    console.error("Veri alma hatası:", error);
    return [];
  }
}

loginButton.addEventListener("click", async (e) => {
  e.preventDefault();

  const username = usernameInput.value.trim();
  const password = passwordInput.value.trim();

  if (!username || !password) {
    Swal.fire({
      icon: "error",
      title: "Hata",
      text: "Kullanıcı adı ve şifre boş bırakılamaz!",
    });
    return;
  }

  try {
    const users = await fetchUsers();

    let matchingUser = users.find(
      (user) => user.name === username && user.password === password
    );

    if (matchingUser) {
      Swal.fire({
        icon: "success",
        title: "Başarılı!",
        text: "Giriş başarılı, hoş geldiniz!",
      }).then(() => {
        matchingUser.Islogged = true;

        fetch(`${BASE_URL}/${endpoints.teachers}/${matchingUser.id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ isLogged: true }),
        });

        window.location.href = "index.html";  
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Hata",
        text: "Kullanıcı adı veya şifre hatalı!",
      });
    }
  } catch (error) {
    console.error("Giriş işlemi hatası:", error);
    Swal.fire({
      icon: "error",
      title: "Hata",
      text: "Bir sorun oluştu, lütfen tekrar deneyin.",
    });
  }
});

