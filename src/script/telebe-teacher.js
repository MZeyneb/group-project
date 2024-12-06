import { endpoints } from "../constants/api.js"
import { getAllData } from "../services/api/index.js"

import Swal from 'sweetalert2'

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

const user = document.querySelector(".user")
const overlay = document.querySelector(".overlay")
const ul = document.querySelector(".overlay ul")
overlay.style.height = "0" 
ul.style.opacity = "0"
user.addEventListener("click", function(){
    if(overlay.style.height == "100px" ){
        overlay.style.height = "0" 
        ul.style.opacity = "0"
    }
    else{
        overlay.style.height = "100px" 
        ul.style.opacity = "1"
    }
    
})

document.getElementById('logout').addEventListener('click', function(event) {
  event.preventDefault();

  Swal.fire({
    title: 'Are you sure?',
    text: 'Do you want to log out?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, log out!',
    cancelButtonText: 'No, stay logged in'
  }).then((result) => {
    if (result.isConfirmed) {
      sessionStorage.clear();
      
      window.location.href = "../html/index.html"; 
    }
  });
});