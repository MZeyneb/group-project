// const user = document.querySelector(".user")
// const overlay = document.querySelector(".overlay")
// const ul = document.querySelector(".overlay ul")
// overlay.style.height = "0" 
// ul.style.opacity = "0"
// user.addEventListener("click", function(){
//     if(overlay.style.height == "100px" ){
//         overlay.style.height = "0" 
//         ul.style.opacity = "0"
//     }
//     else{
//         overlay.style.height = "100px" 
//         ul.style.opacity = "1"
//     }
    
// })


import Swal from 'sweetalert2';

const sidebar = document.createElement('div');
sidebar.id = 'sidebar';
sidebar.style.width = '250px';
sidebar.style.height = '100vh';
sidebar.style.backgroundColor = '#859A9D';
sidebar.style.position = 'fixed';
sidebar.style.top = '0';
sidebar.style.right = '-250px';
sidebar.style.boxSizing = 'border-box';
sidebar.style.transition = 'right 0.3s ease';
sidebar.style.zIndex = '1000';
sidebar.style.boxShadow = '2px 0 15px rgba(0, 0, 0, 0.3)';
sidebar.style.paddingTop = '40px'; 
document.body.appendChild(sidebar);

function createMenuItem(text, href, action) {
    const div = document.createElement('div');
    div.style.width = '250px';
    div.style.height = '50px';
    div.style.textAlign = 'left';
    div.style.transition = '0.3s ease';
    div.style.paddingLeft = '20px';
    div.style.display = 'flex';
    div.style.alignItems = 'center';

    const link = document.createElement('a');
    link.innerText = text;
    link.href = href;
    link.style.display = 'block';
    link.style.width = '100%';
    link.style.padding = '12px 4px';
    link.style.color = '#fff';
    link.style.textDecoration = 'none';
    link.style.fontSize = '1.2rem';
    link.style.fontFamily = 'Arial, sans-serif';
    link.style.borderRadius = '5px';  
    link.style.transition = "0.3s"
    if (action) link.setAttribute('data-action', action);

    div.appendChild(link);
    div.onmouseover = () => {
        div.style.backgroundColor = '#7d9294';
        link.style.paddingLeft = '30px'; 
    };
    div.onmouseout = () => {
        div.style.backgroundColor = '#859A9D';
        link.style.paddingLeft = '20px'; 
    };

    sidebar.appendChild(div);
}

createMenuItem('Login', '#', 'login');
createMenuItem('Registration', '#', 'registration');

document.querySelectorAll('[data-action]').forEach((menuItem) => {
    menuItem.addEventListener('click', (event) => {
        event.preventDefault();
        const action = event.target.dataset.action;

        if (action === 'login') {
            Swal.fire({
                title: 'Select Login Type',
                text: 'Please choose your login type:',
                icon: 'question',
                showCancelButton: true,
                confirmButtonColor: '#4CAF50',
                cancelButtonColor: '#FF5722',
                confirmButtonText: 'Login as Teacher',
                cancelButtonText: 'Login as Student',
            }).then((result) => {
                if (result.isConfirmed) {
                    window.location.href = "teacher_login.html";
                } else if (result.dismiss === Swal.DismissReason.cancel) {
                    window.location.href = "student_login.html";
                }
            });
        } 
        else if (action === 'registration') {
            Swal.fire({
                title: 'Select Registration Type',
                text: 'Please choose your registration type:',
                icon: 'question',
                showCancelButton: true,
                confirmButtonColor: '#4CAF50',
                cancelButtonColor: '#FF5722',
                confirmButtonText: 'Register as Teacher',
                cancelButtonText: 'Register as Student',
            }).then((result) => {
                if (result.isConfirmed) {
                    window.location.href = "teacher_register.html";
                } else if (result.dismiss === Swal.DismissReason.cancel) {
                    window.location.href = "student_register.html";
                }
            });
        }
    });
});

const closeButton = document.createElement('button');
closeButton.innerText = 'X';
closeButton.style.position = 'absolute';
closeButton.style.top = '1px';
closeButton.style.left = '1px';
closeButton.style.fontSize = '1.5rem';
closeButton.style.background = 'none';
closeButton.style.border = 'none';
closeButton.style.color = '#fff';
closeButton.style.cursor = 'pointer';
closeButton.style.transition = 'opacity 0.3s';
closeButton.style.opacity = '0.7';
closeButton.style.padding = '5px 10px';
sidebar.appendChild(closeButton);

const user = document.querySelector('.user'); 
let sidebarVisible = false;

user.onclick = () => {
    sidebarVisible = !sidebarVisible;
    sidebar.style.right = sidebarVisible ? '0' : '-250px';
};

closeButton.onclick = () => {
    sidebarVisible = false;
    sidebar.style.right = '-250px';
};

document.addEventListener("DOMContentLoaded", () => {
    const searchBtn = document.querySelector('.search-Btn');
    let isScrolling;

    window.addEventListener('scroll', () => {
        searchBtn.classList.add('hidden'); 
        clearTimeout(isScrolling); 
        isScrolling = setTimeout(() => {
            searchBtn.classList.remove('hidden'); 
        }, 600); 
    });
});
