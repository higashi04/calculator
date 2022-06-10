const operation = document.querySelectorAll(".operation");
const previousOperand = document.querySelector(".previous-operand");
const currentOperand = document.querySelector(".current-operand");
const numbers = document.querySelectorAll(".number");
const deleteBtn = document.querySelector(".delete");
const equalsBtn = document.querySelector(".equals");
const allClearBtn = document.querySelector(".allClear");

class Calculator {
  constructor(previousOperandAndText, currentOperandAndText) {
    this.previousOperandAndText = previousOperandAndText;
    this.currentOperandAndText = currentOperandAndText;
    this.clear();
  }

  clear() {
    this.currentOperand = "";
    this.previousOperand = "";
    this.operation = undefined;
  }
  delete() {
    this.currentOperand = this.currentOperand.toString().slice(0, -1);
  }
  appendNumber(number) {
    if (number === "." && this.currentOperand.includes(".")) return;
    this.currentOperand = this.currentOperand.toString() + number.toString();
  }
  chooseOperation(operation) {
    if (this.currentOperand === "") return;
    if (this.previousOperand !== "") {
      this.compute();
    }
    this.operation = operation;
    this.previousOperand = this.currentOperand;
    this.currentOperand = "";
  }
  compute() {
    let computation;
    const prev = parseFloat(this.previousOperand);
    const current = parseFloat(this.currentOperand);
    if (isNaN(prev) || isNaN(current)) return;
    switch (this.operation) {
      case "+":
        computation = prev + current;
        break;
      case "-":
        computation = prev - current;
        break;
      case "*":
        computation = prev * current;
        break;
      case "÷":
        computation = prev / current;
        break;
      default:
        return;
    }
    this.currentOperand = computation;
    this.operation = undefined;
    this.previousOperand = "";
  }
  getDisplayNumber(number) {
    const stringNumber = number.toString();
    const integerDigits = parseFloat(stringNumber.split(".")[0]);
    const decimalDigits = stringNumber.split(".")[1];
    let integerDisplay;
    if (isNaN(integerDigits)) {
      integerDisplay = "";
    } else {
      integerDisplay = integerDigits.toLocaleString("en", {
        maximumFractionDigits: 0,
      });
    }
    if (decimalDigits != null) {
      return `${integerDisplay}.${decimalDigits}`;
    } else {
      return integerDisplay;
    }
  }
  updateDisplay() {
    this.currentOperandAndText.innerText = this.getDisplayNumber(
      this.currentOperand
    );
    if (this.operation != null) {
      this.previousOperandAndText.innerText = `${this.getDisplayNumber(
        this.previousOperand
      )} ${this.operation}`;
    } else {
      this.previousOperandAndText.innerText = "";
    }
  }
}
const calculator = new Calculator(previousOperand, currentOperand)

numbers.forEach(btn => {
    btn.addEventListener('click', ()=> {
        calculator.appendNumber(btn.innerText)
        calculator.updateDisplay()
    })
})
operation.forEach(btn => {
    btn.addEventListener('click', ()=> {
        calculator.chooseOperation(btn.innerText)
        calculator.updateDisplay()
    })
})
equalsBtn.addEventListener('click', () => {
    calculator.compute()
    calculator.updateDisplay()
})
allClearBtn.addEventListener('click', () => {
    calculator.clear()
    calculator.updateDisplay()
})
deleteBtn.addEventListener('click', () => {
    calculator.delete()
    calculator.updateDisplay()
})