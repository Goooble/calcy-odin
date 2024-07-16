let firstNumber;
let secondNumber;
let operator;
let panelFontSize = 50;
let displayNumContainer = [];
let operatorPressed = -1; //initially not allowed
let operatorIndex;
let operable = false;

const numberPanel = document.querySelector(".number-panel");
const buttonCont = document.querySelector(".button-container");
const displayPanel = document.querySelector(".display");

buttonCont.addEventListener("click", (e) => {
  let buttonPressed = e.target.className;
  if (buttonPressed === "number-button") {
    displayValue(displayNumContainer, e);
    if (operatorPressed === true) {
      //after a digit of second number is pressed
      operable = true;
    }
    operatorPressed = false;
  }

  if (buttonPressed === "operator-button") {
    //once an operator is pressed, first number is stored and value is displayed
    if (operatorPressed === false) {
      //only pressed after one number and two numbers(calculates)
      if (operable === true) {
        //if its after two numbers, it calculates
        calculate();
      } else {
        operatorPressed = true;
        firstNumber = +displayNumContainer.join("");
        operatorIndex = displayNumContainer.length;
        displayValue(displayNumContainer, e);
      }
    }
  }

  if (buttonPressed === "equal-button") {
    if (operable) {
      calculate();
    }
  }

  if (buttonPressed === "clear") {
    displayNumContainer = [];
    numberPanel.textContent = "";
    firstNumber = null;
    secondNumber = null;
    operatorIndex = null;
    operatorPressed = -1;
    panelFontSize = 50;
    displayRestrainer();
    operable = false;
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

function calculate() {
  secondNumber = +displayNumContainer.slice(operatorIndex + 1).join("");
  let result = operate(
    firstNumber,
    secondNumber,
    displayNumContainer[operatorIndex]
  );
  numberPanel.textContent = result;
  operatorPressed = false; //enables to chain operations
  operable = false; //basically clean state = disables equalling teh result with lack of a second number and operator
  displayNumContainer = [];
  displayNumContainer[0] = result;
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
  return Math.round(result * 1000) / 1000;
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
