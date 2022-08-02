const width = 16;
const height = 16;
const body = document.querySelector(".body");
let isMouseDown = false;
let currentMode = "color";


const sizeSlider = document.querySelector(".sizeSlider");
const sizeValue = document.querySelector(".sizeValue");
const colorPicker = document.querySelector("input[type=\"color\"]")
const colorButton = document.querySelector(".colorButton");
const rainbowButton = document.querySelector(".rainbowButton");
const eraseButton = document.querySelector(".eraseButton");
const clearButton = document.querySelector(".clearButton");
colorButton.onclick = () => setMode("color");
rainbowButton.onclick = () => setMode("rainbow");
eraseButton.onclick = () => setMode("erase");
clearButton.onclick = () => resetCanvas(sizeSlider.value, sizeSlider.value)
sizeSlider.oninput = function() {
  updateSizeValue(this.value);
  resetCanvas(this.value, this.value)
}

function setMode(newMode) {
  if(currentMode === "color") {
    colorButton.classList.remove("active");
  } else if (currentMode === "rainbow"){
    rainbowButton.classList.remove("active");
  } else if (currentMode === "erase"){
    eraseButton.classList.remove("active");
  }

  if(newMode === "color") {
    colorButton.classList.add("active");
  } else if (newMode === "rainbow"){
    rainbowButton.classList.add("active");
  } else if (newMode === "erase"){
    eraseButton.classList.add("active");
  }
  currentMode=newMode;
}

function createCanvas(width, height)
{
  let canvas = document.createElement("div");
  canvas.setAttribute("id", "canvas");
  canvas.addEventListener("mousedown", () => {
    isMouseDown = true;
  })
  canvas.addEventListener("mouseup", () => {
    isMouseDown = false;
  })
  for( let i = 0; i < height; i++) {
    let row = document.createElement("div");
    row.setAttribute("class", "row");
    for(let j = 0 ; j < width; j++) {
      let col = document.createElement("div");
      col.setAttribute("class", "col");
      col.addEventListener("mousedown", colorCell);
      col.addEventListener("mouseover", (e) => {
        if(isMouseDown === false) return;
        colorCell(e);
      })
      row.appendChild(col);
    }
    canvas.appendChild(row);
  }
  body.appendChild(canvas);
}

function resetCanvas(width, height) {
  const canvas = document.getElementById("canvas");
  canvas.remove()
  createCanvas(width, height);
}

function updateSizeValue(value) {
  sizeValue.innerText = `${value}x${value}`;
}


function colorCell(e) {
  let color;
  if(currentMode === "color") {
    color = colorPicker.value;
  } else if (currentMode === "rainbow"){
    color = generateRandomColor();
  } else if (currentMode === "erase"){
    color = "white"
  }
  e.target.style.backgroundColor = color;
}

function generateRandomColor() {
  const red = Math.floor(Math.random() * 255);
  const green = Math.floor(Math.random() * 255);
  const blue = Math.floor(Math.random() * 255);
  return `rgb(${red}, ${green}, ${blue})`;
}

setMode(currentMode);
createCanvas(width, height);
