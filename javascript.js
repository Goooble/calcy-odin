let firstNumber;
let secondNumber;
let operator;
let panelFontSize = 50;
let displayNumContainer = [];
let operatorPressed = -1; //initially not allowed
let operatorIndex;
let operable = false;
let decimalPressed = false;
let equalPressed = false;

const numberPanel = document.querySelector(".number-panel");
const buttonCont = document.querySelector(".button-container");
const displayPanel = document.querySelector(".display");

buttonCont.addEventListener("click", (e) => {
  if (numberPanel.textContent === "bruh") {
    clearPanel();
  }
  let buttonPressed = e.target.className;
  switch (buttonPressed) {
    case "number-button":
      if (equalPressed === false) {
        displayValue(e);
        if (operatorPressed === true) {
          //after a digit of second number is pressed
          operable = true;
        }
        operatorPressed = false;
      }
      break;
    case "operator-button": //once an operator is pressed, first number is stored and value is displayed
      if (operatorPressed === false) {
        equalPressed = false;
        operatorPressed = true;
        decimalPressed = false;
        //only pressed after one number and two numbers(calculates)
        if (operable === true) {
          //if its after two numbers, it calculates
          operable = false; //basically clean state = disables equalling teh result with lack of a second number and operator
          calculate();
          operatorIndex = displayNumContainer.length;
        } else {
          operatorIndex = displayNumContainer.length;
        }
        firstNumber = +displayNumContainer.join("");
        displayValue(e);
      }
      break;
    case "equal-button":
      if (operable) {
        calculate();
        operable = false; //basically clean state = disables equalling teh result with lack of a second number and operator
        operatorPressed = false;
        displayValue(e);
        equalPressed = true;
      }
      break;

    case "clear":
      clearPanel();
      break;
    case "decimal-button":
      if (decimalPressed === false) {
        decimalPressed = true;
        displayValue(e);
        if (operatorPressed === true) {
          //after a digit of second number is pressed
          operable = true;
        }
        operatorPressed = false;
      }
      break;
  }
});

function clearPanel() {
  displayNumContainer = [];
  numberPanel.textContent = "";
  firstNumber = null;
  secondNumber = null;
  operatorIndex = null;
  operatorPressed = -1;
  panelFontSize = 50;
  displayRestrainer();
  operable = false;
  decimalPressed = false;
  equalPressed = false;
}

//display array updates here
function displayValue(e) {
  if (e.target.textContent !== "=" && displayNumContainer[0] !== "bruh") {
    displayNumContainer[displayNumContainer.length] = e.target.textContent;
  }
  numberPanel.textContent = displayNumContainer.join("");
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
      if (num2 === 0) {
        return "bruh";
      } else {
        result = divide(num1, num2);
      }
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
