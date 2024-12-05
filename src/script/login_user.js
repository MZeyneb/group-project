import BASE_URL, { endpoints } from "../constants.js";

// Function to handle login
async function login() {
  const username = document.getElementById("login-username").value;
  const password = document.getElementById("login-password").value;

  if (!username || !password) {
    alert("Please fill in all fields.");
    return;
  }

  // Check both teachers and students
  const teacherResponse = await fetch(`${BASE_URL}${endpoints.teachers}`);
  const teachers = await teacherResponse.json();

  const studentResponse = await fetch(`${BASE_URL}${endpoints.students}`);
  const students = await studentResponse.json();

  // Find user in teachers or students
  const user =
    teachers.find(
      (user) => user.username === username && user.password === password
    ) ||
    students.find(
      (user) => user.username === username && user.password === password
    );

  if (user) {
    alert(`Welcome, ${user.username}!`);
    // You can redirect or store login data in localStorage/sessionStorage
    window.location.href = "dashboard.html"; // Example redirection after login
  } else {
    alert("Invalid username or password.");
  }
}

// Attach event listener
document.getElementById("login-btn").addEventListener("click", login);
