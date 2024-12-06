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
      console.log(matchingUser);

      // Kullanıcı zaten giriş yapmadıysa, giriş yapmasını sağla
      if (matchingUser.Islogged === false) {
        console.log(matchingUser.Islogged);
        fetch(`${BASE_URL}/${endpoints.students}/${matchingUser.id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ Islogged: true }),
        })
          .then(() => {
            Swal.fire({
              icon: "success",
              title: "Başarılı!",
              text: "Giriş başarılı, hoş geldiniz!",
            }).then(() => {
              window.location.href = "register_user.html";
            });
          })
          .catch((error) => {
            console.error("Giriş güncelleme hatası:", error);
            Swal.fire({
              icon: "error",
              title: "Hata",
              text: "Bir sorun oluştu, lütfen tekrar deneyin.",
            });
          });
      } else {
        // Kullanıcı zaten giriş yapmış
        Swal.fire({
          icon: "info",
          title: "Bilgi",
          text: "Kullanıcı zaten giriş yapmış.",
        });
      }
    } else {
      // Hatalı kullanıcı adı veya şifre
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
