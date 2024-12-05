function register() {
    const userType = document.getElementById('select').value;
    const fullName = document.getElementById('fullName').value;
    const email = document.getElementById('InputEmail1').value;
    const password = document.getElementById('InputPassword1').value;
    const profileImage = document.getElementById('profileImage').files[0];
  
    if (!fullName || !email || !password || !profileImage) {
      alert('Please fill in all fields');
      return;
    }
  
    const url = userType === 'student' ? 'http://localhost:3000/students' : 'http://localhost:3000/teachers';
  
    fetch(url)
      .then(response => response.json())
      .then(data => {
        const userExists = data.some(user => user.email === email);
  
        if (userExists) {
          alert('This email is already registered. Redirecting to login page.');
          window.location.href = 'login.html';
        } else {
          const reader = new FileReader();
          reader.onloadend = function() {
            const imageBase64 = reader.result;
  
            const userData = {
              fullName,
              email,
              password,
              profileImage: imageBase64,
            };
  
            fetch(url, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(userData),
            })
            .then(response => response.json())
            .then(data => {
              alert('Registration successful!');
              window.location.href = 'login.html';
            })
            .catch(error => {
              console.error('Error:', error);
              alert('Registration failed. Please try again.');
            });
          };
  
          reader.readAsDataURL(profileImage);
        }
      })
      .catch(error => {
        console.error('Error fetching users:', error);
        alert('Error checking if email exists. Please try again later.');
      });
  }
  