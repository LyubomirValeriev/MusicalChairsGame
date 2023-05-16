const music = document.getElementById("music");
const startButton = document.getElementById("start-button");
const stopButton = document.getElementById("stop-button");
const resetButton = document.getElementById("reset-button");
const chairs = document.querySelectorAll(".chair");

const popupContainer = document.getElementById('popup-container');
const popupCloseBtn = document.getElementById('popup-close-btn');

let isPlaying = false;
let interval;
var SetCheirs= false ;
var chairIds ;
let script ; 

const closeBtn = document.getElementById("popup-images-close-btn");
const popupContainerImage = document.getElementById("popup-container-images");
const selectedImages = [];

function generateChairs(numChairs) {
    var delay = 0 ; 
    const chairContainer = document.querySelector(".chair-container");
    for (let i = 0; i < numChairs; i++) {
        const chair = document.createElement("div");
        chair.classList.add("chair");
        chair.setAttribute("id", "chair" + (i+1));
        chair.style.animationDelay = delay + "s";
        console.log(selectedImages[i]);
       // chair.innerHTML = `<img class="chair" src="images/GoT - got${i+1}.png" alt="">`;
        chair.innerHTML = `<img class="chair" src="${selectedImages[i]}" alt="">`;

        chairContainer.appendChild(chair);
        delay = delay + 2 ; 
    }
    fillArr();

}
let numChairs = 0 ; 
function startGame() {
    if (SetCheirs == false){
        numChairs = parseInt(prompt("Enter the number of chairs:"));
        var modal = document.getElementById("popup-container-images");
        modal.style.display = "block";
    }
    else
    {
        startGameAfterPopup();
    }

    console.log(SetCheirs);
 /*   if (SetCheirs == false){
         const numChairs = parseInt(prompt("Enter the number of chairs:"));
         generateChairs(numChairs);
         postNumChairs();
         SetCheirs = true;
         console.log(SetCheirs);
    }else{
    const chairs = document.querySelectorAll(".chair");
    chairs.forEach(chair => {
        chair.classList.remove("paused");
        chair.classList.add("running");
    });
}
    
console.log(SetCheirs);
    isPlaying = true;
    music.play();*/
}

function startGameAfterPopup(){
    
    console.log(SetCheirs);
    if (SetCheirs == false){
         generateChairs(numChairs);
         postNumChairs();
         SetCheirs = true;
         console.log(SetCheirs);
    }else{
    const chairs = document.querySelectorAll(".chair");
    chairs.forEach(chair => {
        chair.classList.remove("paused");
        chair.classList.add("running");
    });
}
    
console.log(SetCheirs);
    isPlaying = true;
    music.play();
}


function stopGame() {
 
    console.log(chairIds);

    const chairs = document.querySelectorAll(".chair");
   
    chairs.forEach(chair => {
        chair.classList.remove("running");
        chair.classList.add("paused");
    });
    
   
    isPlaying = false;
    music.pause();

    if (chairIds.length >1)  { 
        removeChair();
    }

    console.log(chairIds + "posledno");
}

function resetGame() { 
    
   // stopGame();
   fillArr();
    const chairs = document.querySelectorAll(".chair"); // Select all chairs
    chairs.forEach(chair => {
        chair.classList.remove("hidden"); // Remove the .hidden class from all chairs
        chair.classList.add("visible"); // Add the .visible class to all chairs
    });  
   
    chairs.forEach(chair => {
    chair.classList.remove("paused");
     chair.classList.add("running");
    });
    
    refreshNumChairs();
    postNumChairs();
}


function removeChair() {
 
    fetch('http://localhost:8080/chair/fetch')
    .then(response =>
        response.text()) // Превръщане на отговора в текст
    .then(idString => {
      // Търсене на елемента със съответното ID
      let element = document.getElementById(idString);
      alert(idString);
      // Проверка дали елементът е намерен
      if (element) {
        alert("Намерен елемент с ID", idString);
        element.classList.add("hidden")

        let index = chairIds.indexOf(idString);
        if (index !== -1) {
          chairIds.splice(index, 1);
        }

        if (chairIds.length == 1) {
            showPopup();
            addScript();
       }
      } else {
        alert("Не е намерен елемент с ID", idString);
      }
    });
}

function postNumChairs() {
    fillArr();
    console.log(chairIds);
    const data = {  Array: chairIds };
    console.log(data);
    const url = "http://localhost:8080/chair/numchairs"; // backend endpoint URL
    fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(chairIds)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        return response.json();
    })
    .then(data => {
        console.log(data); 
    })
    .catch(error => {
        console.error("There was an error with the fetch request:", error);
    });
}

function refreshNumChairs() {
    console.log(chairIds);
    const data = {  Array: chairIds };
    console.log(data);
    const url = "http://localhost:8080/chair/refreshchairs"; // backend endpoint URL
    fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(chairIds)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        return response.json();
    })
    .then(data => {
        console.log(data); 
    })
    .catch(error => {
        console.error("There was an error with the fetch request:", error);
    });
}

function showPopup() {
/*select chair */
var chairLeft = document.getElementById(chairIds[0]);
console.log(chairLeft);
const imgSrc = chairLeft.querySelector("img");
const filePath = imgSrc.getAttribute('src');
console.log(filePath);
console.log("kur");
var setChair =  document.querySelector(".popup-image-cont");
setChair.setAttribute("src", filePath);
    popupContainer.style.display = 'block';
  }
  
  function hidePopup() {
    popupContainer.style.display = 'none';
  }

function addScript(){

    script = document.createElement("script");
    script.src = "fireworks.js";
    script.id = "fireworks";
    document.body.appendChild(script);
    startButton.disabled=true;
    canvas.play();
}

function fillArr(){
    chairIds = Array.from(document.querySelectorAll('.chair')).map(chair => chair.id).filter(chair => chair !== "");
}

startButton.addEventListener("click", startGame);
stopButton.addEventListener("click", stopGame);
resetButton.addEventListener("click", resetGame);
popupCloseBtn.addEventListener('click', hidePopup);

popupCloseBtn.addEventListener("click", () => {
 
       const scriptElement = document.getElementById("fireworks");
       scriptElement.remove();
       // clear the canvas manually
       canvas.remove();
});

stopButton.addEventListener("click", () => {
    stopButton.disabled = true;
    startButton.disabled=false;
});

startButton.addEventListener("click", () => {
    startButton.disabled=true;
    stopButton.disabled = false ; 
});

resetButton.addEventListener("click", () => {
    stopButton.disabled = true; 
    startButton.disabled=false;
   
});

// add event listener to close button
closeBtn.addEventListener("click", () => {
  
  // loop through checkboxes and push image src to array if checkbox is checked
  const checkboxes = document.querySelectorAll("input[type=checkbox]");
  checkboxes.forEach(checkbox => {
    if (checkbox.checked) {
      const imgSrc = checkbox.parentNode.querySelector("img");
      const filePath = imgSrc.getAttribute('src');
      selectedImages.push(filePath);
    }
  });
  if (selectedImages.length < numChairs) {
    alert("Изберете още =>" + (numChairs-selectedImages.length) + "снимки");
    selectedImages.length=0;
    return;
}
if(selectedImages.length > numChairs){
    alert("Изберете с снимки =>" + (selectedImages.length - numChairs) + " по-малко");
    selectedImages.length=0;
    return;
}
  startGameAfterPopup();
  console.log(selectedImages); // log the array of selected images
  popupContainerImage.style.display = "none"; // hide the popup container
});
