let firstNumber;
let secondNumber;
let operator;
let displayNumContainer = [];
const numberPanel = document.querySelector('.number-panel')
const numberGrid = document.querySelector('.number-grid');
numberGrid.addEventListener('click', (e) => {
    if(e.target.className === 'number-button'){
  displayNumContainer[displayNumContainer.length] = e.target.textContent;
  displayRestrainer();
  displayValue(displayNumContainer);
    }
});

function displayValue(array){
    numberPanel.textContent = array.join("");
}

function displayRestrainer(){
    
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
