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