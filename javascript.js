//one function one job: follow this very strictly
//find out the core loop where you can update values(point of change)
//for any repeated code(expressions or block of statements) create variables and functions
//create visual clues to keep track of logic and stuff, like enabled and disabled
let firstNumber;
let secondNumber;
let operator;
let panelFontSize = 50;
let numContainer = [];
const numString = "1234567890";
const operatorString = "÷x-=+";
let latestValue;
let operatorIndex;
let buttonEntered;
let keyItem;


const numberPanel = document.querySelector(".number-panel");
const mainButtonCont = document.querySelector(".number-grid");
const displayPanel = document.querySelector(".display");

const clearButton = document.querySelector(".clear");
const backButton = document.querySelector(".back-remove");
const equalButton = document.querySelector(".equal-button");
const numButton = Array.from(document.querySelectorAll(".number-button"));
const opButtons = Array.from(document.querySelectorAll(".operator-button"));
const decimalButton = document.querySelector(".decimal-button");
const allKeys = Array.from(document.querySelectorAll(".number-grid button"));

//initial state
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


function numberPress(item){
  updateArray(item);
  displayValue();
  console.log("number pressed");
  updateVariables();
}

function operatorPress(item){
  if (operatorIndex !== -1) {
    calculate();
    
  }
  updateArray(item);
  displayValue();
  updateVariables();
  console.log("operator pressed");
}
function equalPress(){
  console.log("equal pressed");
  calculate();
  displayValue();
  updateVariables();
}
function decimalPress(item){
  console.log("decimal pressed");
    updateArray(item);
    displayValue();
    updateVariables();
}

clearButton.addEventListener("click", clearPanel);
backButton.addEventListener('click', backSpace);

//using keys to simulate a click on teh buttons so that disabling still works
document.addEventListener('keydown', (e) => {
  console.log(e.key);
  switch(e.key){
    case "Enter":
      keyItem = "=";
      break;
    case "/":
      keyItem = "÷";
      break;
    case "*":
      keyItem = "x";
      break;
    default: keyItem = e.key; 
  }
  
  
  allKeys.forEach((buttons) => {
    if(buttons.textContent === keyItem){
      buttonEntered = buttons;
      console.log(buttonEntered);
    }
  })
  buttonEntered.click();

  if(keyItem === "Backspace"){
    backSpace();
  }
  if(keyItem === "Delete"){
    clearPanel();
  }

})
mainButtonCont.addEventListener("click", buttonClick);
function buttonClick(e){
  checkForZero();
  let buttonPressed = e.target.className;
  let key = e.target.textContent;
  switch (buttonPressed) {
    case "number-button":
      numberPress(key);
      break;

    case "operator-button":
      operatorPress(key);
      break;

    case "equal-button":
      equalPress();
      break;
    case "decimal-button":
    decimalPress(key);
  }
  //keep updating these variables after every click
}

function updateVariables(){
  operatorIndex = numContainer.findIndex((item, index, array) => {
    if (index !== 0) {
      return operatorString.includes(item) === true;
    }
  });
  toggleButtons();
  updateFirstNum();
  updateSecondNum();
  console.log("-------------------");
}
//to enable and disable these buttons when they shoudnt be working
function toggleButtons() {
  latestValue = numContainer[numContainer.length - 1]; //to find if a number, equal, decimal or operator was pressed last

  //operators
  if (numString.includes(latestValue)) {
    enableOperator();
  } else {
    disableOperator();
  }
  //equal
  if (numString.includes(latestValue) && operatorIndex !== -1) {
    enableEqual();
  } else {
    disableEqual();
  }

  //decimal
  if(operatorIndex === -1)
  {
    if(numContainer.findIndex(item => item === ".") !== -1){
      disableDecimal();
    }
    else{enableDecimal();}
  }
  else{
    if(numContainer.findIndex(item => item === ".") > operatorIndex || numContainer.findLastIndex(item => item === ".") > operatorIndex){
      disableDecimal();

    }
    else{enableDecimal();}

  }
  console.log(`latestValue: ${latestValue}`);
  console.log(`operator index: ${operatorIndex}`);
}

//number updates to prepare for calculation
function updateSecondNum() {
  if (operatorIndex !== -1) {
    secondNumber = +numContainer.slice(operatorIndex + 1).join("");
    console.log(`second number: ${secondNumber}`);
  }
  
}

function updateFirstNum() {
  
  if (operatorIndex !== -1 && latestValue === numContainer[operatorIndex]) {
    firstNumber = +numContainer.slice(0, numContainer.length - 1).join("");
    console.log(`firstNumber: ${firstNumber}`);
  }
}
//updates displayArray and calls operate function
function calculate() {
  let result = operate(firstNumber, secondNumber, numContainer[operatorIndex]);
  numContainer = [];
  numContainer = result.toString().split("");
}

//display array is updated that also acts as a basis for toggling and where first num and second num are extracted from
function updateArray(text) {
  numContainer.push(text);
}
//display array is displayed
function displayValue() {
  numberPanel.textContent = numContainer.join("");
  displayRestrainer();
}
//clear button
function clearPanel() {
  console.clear();
  numContainer = [];
  numberPanel.textContent = "";
  firstNumber = null;
  secondNumber = null;
  panelFontSize = 50;
  displayRestrainer();

  enableDecimal();
  disableOperator();
  disableEqual();
}
function backSpace(){
  numContainer.pop();
  displayValue();
  updateVariables();
  console.log("back pressed");
}
//function to execute after bruh has been displayed
function checkForZero() {
  if (numberPanel.textContent === "bruh") {
    clearPanel();
  }
}
//to limit the number of digits on teh panel
function displayRestrainer() {
  let widthExceeded =
    numberPanel.offsetWidth / displayPanel.offsetWidth >= 0.85;
  if(!widthExceeded) {
    numberPanel.style.fontSize = `50px`;//so that initially its 50px
  }
  else{
    while (widthExceeded) {
    panelFontSize -= 1;
    numberPanel.style.fontSize = `${panelFontSize}px`;
    widthExceeded = numberPanel.offsetWidth / displayPanel.offsetWidth >= 0.85;
    }
  }
  panelFontSize = 50;
}
//math stuff
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
