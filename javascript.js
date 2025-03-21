function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return a / b;
}

function operate(firstOperator, secondOperator, operation) {
    switch (operation) {
        case "+":
            return add(firstOperator, secondOperator);
        case "-":
            return subtract(firstOperator, secondOperator);
        case "*":
            return multiply(firstOperator, secondOperator);
        case "/":
            return divide(firstOperator, secondOperator);
    }
}

let firstOperator = 0;
let secondOperator = 0;
let operation = "";

operate(firstOperator, secondOperator, operation);