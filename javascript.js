let firstNumber;
let secondNumber;
let operator;
let panelFontSize = 50;
let numContainer = [];
const numString = "1234567890";
const operatorString = "÷x-=+";
let latestValue;
let operatorIndex;

const numberPanel = document.querySelector(".number-panel");
const mainButtonCont = document.querySelector(".number-grid");
const displayPanel = document.querySelector(".display");

const clearButton = document.querySelector(".clear");
const backButton = document.querySelector(".back-remove");
const equalButton = document.querySelector(".equal-button");
const numButton = Array.from(document.querySelectorAll(".number-button"));
const opButtons = Array.from(document.querySelectorAll(".operator-button"));
const decimalButton = document.querySelector(".decimal-button");

//button enablers
disableOperator();
disableEqual();

function disableDecimal() {
  decimalButton.disabled = true;
}
function enableDecimal() {
  decimalButton.disabled = false;
}
function disableEqual() {
  equalButton.disabled = true;
}
function enableEqual() {
  equalButton.disabled = false;
}
function disableOperator() {
  opButtons.forEach((btn) => (btn.disabled = true));
}
function enableOperator() {
  opButtons.forEach((btn) => (btn.disabled = false));
}

clearButton.addEventListener('click', clearPanel);

mainButtonCont.addEventListener("click", (e) => {

  let buttonPressed = e.target.className;
  switch (buttonPressed) {
    case "number-button":
      updateArray(e);
      displayValue();
      console.log("number pressed");
      break;
    case "operator-button":
      updateArray(e);
      displayValue();
      console.log("operator pressed");
      break;
    case "equal-button":
      
      console.log("equal pressed");
      break;
    case "decimal-button":
      break;
  }
  
  operatorIndex= numContainer.findIndex((item) => operatorString.includes(item) === true);
  toggleButtons();
  updateFirstNum();
  updateSecondNum();
  
  
});

function toggleButtons() {
  latestValue = numContainer[numContainer.length - 1]; //to find if a number, equal, decimal or operator was pressed last
  //operators
  if (numString.includes(latestValue)) {
    enableOperator();
  } else {
    disableOperator();
  }
  //equal
  if (
    numString.includes(latestValue) &&
    operatorIndex !==-1) {
    enableEqual();
  } else {
    disableEqual();
  }

//decimal
console.log(`latestValue: ${latestValue}`);
console.log( `operator index: ${operatorIndex}`)
}

//number updates
function updateSecondNum() {
  if(operatorIndex !== -1)
  {secondNumber = +numContainer.slice(operatorIndex+1).join("");}
  console.log(`second number: ${secondNumber}`);
}

function updateFirstNum() {
  if (operatorIndex !==-1 && latestValue === numContainer[operatorIndex]) {
  
  firstNumber = +numContainer.slice(0, numContainer.length - 1).join("");
  console.log(`firstNumber: ${firstNumber}`);
}
}

//display array is updated
function updateArray(e) {
  numContainer.push(e.target.textContent);
}
//display array is displayed
function displayValue(e) {
  numberPanel.textContent = numContainer.join("");
  displayRestrainer();
}

function clearPanel() {
  console.clear();
  numContainer = [];
  numberPanel.textContent = "";
  firstNumber = null;
  secondNumber = null;
  panelFontSize = 50;
  displayRestrainer();

  disableOperator();
  disableEqual();
}

function checkForZero() {
  if (numberPanel.textContent === "bruh") {
    clearPanel();
  }
}

function displayRestrainer() {
  if (numberPanel.offsetWidth / displayPanel.offsetWidth >= 0.85) {
    panelFontSize -= 4;
  }
  numberPanel.style.fontSize = `${panelFontSize}px`;
}



function calculate() {
  secondNumber = +numContainer.slice(operatorIndex + 1).join("");

  let result = operate(firstNumber, secondNumber, numContainer[operatorIndex]);
  numContainer = [];
  numContainer[0] = result;
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
