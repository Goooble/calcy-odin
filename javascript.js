let firstNumber;
let secondNumber;
let operator;
let displayNumContainer = [];
let panelFontSize = 50;
let operatorPressed = false;
let operatorIndex;

const numberPanel = document.querySelector(".number-panel");
const numberGrid = document.querySelector(".number-grid");
const displayPanel = document.querySelector(".display");

numberGrid.addEventListener("click", (e) => {
  if (e.target.className === "number-button") {
    displayValue(displayNumContainer, e);
  }

  if (e.target.className === "operator-button") {
    if (!operatorPressed) {
      operatorPressed = true;
      firstNumber = +displayNumContainer.join("");
      operatorIndex = displayNumContainer.length;
      displayValue(displayNumContainer, e);
      console.log(firstNumber);
    }
  }

  if (e.target.className === "equal-button") {
    secondNumber = +displayNumContainer.slice(operatorIndex+1).join("");
    numberPanel.textContent = operate(firstNumber, secondNumber, displayNumContainer[operatorIndex]);
    console.log(operatorIndex);
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
    numberPanel.style.fontSize = `${panelFontSize}px`;
  }
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
    case "*":
      result = mult(num1, num2);
      break;
    case "/":
      result = divide(num1, num2);
      break;
  }
  return result;
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
