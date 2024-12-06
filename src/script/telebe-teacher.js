import { endpoints } from "../constants/api.js"
import { getAllData } from "../services/api/index.js"

const cards = document.querySelector(".cards")
const cardinfo = document.querySelector(".card-info")
const input = document.querySelector(".search");


async function getAllStudents() {
    const res = await getAllData(endpoints.students)
    drawcards(res.data)
        arr = res.data;
}


let arr = null;


function drawcards(arr) {
    cardinfo.innerHTML = "" 
    arr.forEach(element => {
        const card = document.createElement("div")
        card.classList.add("card")

        card.innerHTML = `
            <img src="${element.profileImage}" class="student-img">
            <p class="full-name">${element.fullName}</p>
            <p class="email">${element.email}</p>
            <button class="assignments">Assignments</button>`

       
        const but = card.querySelector(".assignments")

      
        but.addEventListener("click", () => {
            window.location.replace(`qiymet.html?id=${element.id}`);
        });

        
        cardinfo.appendChild(card)
    })


    cards.appendChild(cardinfo)  

    
}

input.addEventListener("keyup", function () {
    const filtered = arr.filter((item) => {
        return item.fullName.toLowerCase().includes(input.value.toLowerCase().trim());
    });
    drawcards(filtered);
    
});


getAllStudents()

const sidebar = document.createElement('div');
sidebar.id = 'sidebar';
sidebar.style.width = '200px';
sidebar.style.height = '100vh';
sidebar.style.backgroundColor = '#859A9D';
sidebar.style.position = 'fixed';
sidebar.style.top = '0';
sidebar.style.right = '-200px';
sidebar.style.boxSizing = 'border-box';
sidebar.style.transition = 'right 0.3s ease';
sidebar.style.zIndex = '1000';
document.body.appendChild(sidebar);

const image = document.createElement('img');
image.src ="https://v.wpimg.pl/MmJhNjg4YgwrCjhZSE9vGWhSbAMOFmFPP0p0SEgFf1V6EGEMDlgoHy8YIUQARjgdKx8-RBdYYgw6AWEcVhspBDkYIgseGygAKA0qRVdXfQwrXH9eSlB5XX1Fel5QBWBVcg16R1QFeF8oCXhSXw14C2gV";
image.style.borderRadius = '50%';
image.style.width = '100px';
image.style.height = '100px';
image.style.display = 'flex';
image.style.justifyContent = 'center';
image.style.alignItems = 'center';
sidebar.appendChild(image);

const Logoutbtn = document.createElement('button');

function createMenuItem(text, href, action) {
  const div = document.createElement('div');
  div.style.width = '200px';
  div.style.height = '40px';
  div.style.textAlign = 'left';
  div.style.transition = '0.6s ease';


  const link = document.createElement('a');
  link.id = text.toLowerCase();
  link.id = text;
  link.innerText = text;
  link.href = href;
  link.style.display = 'block';
  link.style.padding = '12px 4px';
  link.style.color = '#fff';
  link.style.textDecoration = 'none';
  link.style.fontSize = '1rem';
  link.style.fontFamily = 'Arial, sans-serif';
  if (action) link.setAttribute('data-action', action);

  div.appendChild(link);
  div.onmouseover = () => (div.style.backgroundColor = '#7d9294');
  div.onmouseout = () => (div.style.backgroundColor = '#859A9D');

  sidebar.appendChild(div);
}

createMenuItem('Products', 'product.html');
createMenuItem('logout', '#','logout');

document.querySelectorAll('[data-action]').forEach((menuItem) => {
  menuItem.addEventListener('click', (event) => {
    event.preventDefault();
    const action = event.target.dataset.action;

  if (action === 'logout') {
      Swal.fire({
          title: 'Are you sure?',
          text: "Do you really want to log out?",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, log out!'
      }).then((result) => {
          if (result.isConfirmed) {
            Swal.fire({
              title: 'Logged Out',
              text: 'You have been logged out successfully.',
              icon: 'success',
               confirmButtonText: 'OK',
          }).then(() => {
              location.href = "login.html"
          })
             
          }
      });
  } else if (action === 'login' || action === 'registration') {
      window.location.href = event.target.href;
  }
});
});

const closeButton = document.createElement('button');
closeButton.innerText = 'X';
closeButton.style.position = 'absolute';
closeButton.style.top = '2px';
closeButton.style.left = '9px';
closeButton.style.fontSize = '0.6rem';
closeButton.style.background = 'none';
closeButton.style.border = 'none';
closeButton.style.color = '#fff';
closeButton.style.opacity = '0.7';
closeButton.style.cursor = 'pointer';
sidebar.appendChild(closeButton);

const user = document.querySelector('.user'); 

let sidebarVisible = false;

user.onclick = () => {
  sidebarVisible = !sidebarVisible;
  sidebar.style.right = sidebarVisible ? '0' : '-200px';
};

closeButton.onclick = () => {
  sidebarVisible = false;
  sidebar.style.right = '-200px';
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