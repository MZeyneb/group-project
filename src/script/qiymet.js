
import { endpoints } from "../constants/api.js"
import { getAllData } from "../services/api/index.js"

const cards = document.querySelector(".cards")
const cardinfo = document.querySelector(".card-info")
const back = document.querySelector(".back")


const urlParams = new URLSearchParams(window.location.search);
const studentId = urlParams.get('id');



async function getAllTasks() {
    const res = await getAllData(endpoints.tasks)
    drawcards2(res.data)
}



function drawcards2(arr) {
        cardinfo.innerHTML = ""
    arr.forEach(element => {
        console.log(element.id);
        
        if(element.id ===studentId){
            
            const card2 = document.createElement("div")
            card2.classList.add("card2")

            card2.innerHTML = `
                <p class="title">title: ${element.title}</p>
                <p class="description">description: ${element.description}</p>
                <p class="topic">topic: ${element.topic}</p>
                <input class="grade" placeholder="grade">`



            cardinfo.appendChild(card2)
            cards.appendChild(cardinfo)
        }
        
    });
}

back.addEventListener("click", ()=>{
    window.location.replace("/telebe-teacher.html")
})





getAllTasks()



