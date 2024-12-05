import { endpoints } from "../constants/api.js"
import { getAllData } from "../services/api/index.js"

const cards = document.querySelector(".cards")
const cardinfo = document.querySelector(".card-info")


async function getAllStudents() {
    const res = await getAllData(endpoints.students)
    drawcards(res.data);
}


async function getAllTasks() {
    const res = await getAllData(endpoints.tasks)
    drawcards2(res.data)
}

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

        cardinfo.appendChild(card)
        cards.appendChild(cardinfo)
    });
}


function drawcards2(arr) {
    arr.forEach(element => {
        const card2 = document.createElement("div")
        card2.classList.add("card2")

        card2.innerHTML = `
                <p class="title">title: ${element.title}</p>
                <p class="description">description: ${element.description}</p>
                <p class="topic">topic: ${element.topic}</p>`



                function toggleCardInfo() {
                    card2.classList.toggle("open")
                }
                
                
                document.querySelectorAll(".assignments").forEach(button => {
                    button.addEventListener("click", toggleCardInfo)
                })
        

        cardinfo.appendChild(card2)
        cards.appendChild(cardinfo)
        
    });
}




getAllStudents()
getAllTasks()
