let firstNumber;
let secondNumber;
let operator;
let panelFontSize = 50;
let displayNumContainer = [];
let operatorPressed = false;
let operatorIndex;

const numberPanel = document.querySelector(".number-panel");
const buttonCont = document.querySelector(".button-container");
const displayPanel = document.querySelector(".display");

buttonCont.addEventListener("click", (e) => {
  let buttonPressed = e.target.className;
  if (buttonPressed === "number-button") {
    displayValue(displayNumContainer, e);
  }

  if (buttonPressed === "operator-button") {
    if (!operatorPressed) {
      operatorPressed = true;
      firstNumber = +displayNumContainer.join("");
      operatorIndex = displayNumContainer.length;
      displayValue(displayNumContainer, e);
      console.log(firstNumber);
    }
  }

  if (buttonPressed === "equal-button") {
    secondNumber = +displayNumContainer.slice(operatorIndex+1).join("");
    numberPanel.textContent = operate(firstNumber, secondNumber, displayNumContainer[operatorIndex]);
    console.log(operatorIndex);
  }

  if(buttonPressed === "clear"){
    displayNumContainer = [];
    numberPanel.textContent = "";
    firstNumber = null;
    secondNumber = null;
    operatorIndex = null;
    operatorPressed = false;
    panelFontSize = 50;
    displayRestrainer();

  } 
});

//display array updates here
function displayValue(array, e) {
  displayNumContainer[displayNumContainer.length] = e.target.textContent;
  numberPanel.textContent = array.join("");
  displayRestrainer();
}

function displayRestrainer() {
  if (numberPanel.offsetWidth / displayPanel.offsetWidth >= 0.85) {
    panelFontSize -= 4;
  }
  numberPanel.style.fontSize = `${panelFontSize}px`;
}

function operate(num1, num2, op) {
  let result;
  switch (op) {
    case "+":
      result = add(num1, num2);
      break;
    case "-":
      result = sub(num1, num2);
      break;
    case "x":
      result = mult(num1, num2);
      break;
    case "÷":
      result = divide(num1, num2);
      break;
  }
  return Math.round(result*1000)/1000;
}

function add(a, b) {
  return a + b;
}
function sub(a, b) {
  return a - b;
}
function mult(a, b) {
  return a * b;
}
function divide(a, b) {
  return a / b;
}
