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
