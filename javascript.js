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

function operate(firstOperand, secondOperand, operator) {
    switch (operator) {
        case "+":
            return add(firstOperand, secondOperand);
        case "-":
            return subtract(firstOperand, secondOperand);
        case "*":
            return multiply(firstOperand, secondOperand);
        case "/":
            return divide(firstOperand, secondOperand);
    }
}

// let firstOperand = 0;
// let secondOperand = 0;
let operator = ""; // event listener to operator buttons

let operation = [];
let operationDone = true;

operate(operation[0], operation[3], operation[2]);

let numberOnScreen = "0";

const numScreen = document.querySelector(".screen");
const clear = document.querySelector(".clear");
const changeSign = document.querySelector(".change-sign");
const percent = document.querySelector(".percent");
const buttons = document.querySelectorAll(".numbers .button");
const operators = document.querySelector(".operators .button")

numScreen.textContent = numberOnScreen;

clear.addEventListener("click", () => {
    numberOnScreen = "0";
    operation.splice(0);
    operationDone = true;
});

changeSign.addEventListener("click", () => {
    numberOnScreen = parseInt(numberOnScreen * -1);
});

percent.addEventListener("click", () => {
    numberOnScreen = parseInt(numberOnScreen / 100);
});

// buttons.forEach((button) => {
//     button.addEventListener("click", () => {
//         if (numberOnScreen == "0") {

//         }
//     })
// });


/*
Pseudocode
1. If clear is pressed:
    1.1. numberOnScreen = 0
    1.2. clear operation
    1.3. operationDone = true
2. If +/- is pressed:
    2.1. numberOnScreen *= -1
3. If % is pressed:
    3.1. numberOnScreen /= 100
4. If any number is pressed:
    4.1. Need to check if numberOnScreen is 0 first
        4.1.1. If ((numberOnScreen == "0") or (Number.isInteger(numberOnScreen) is true)):
        
        // Note: I'm still not sure if an integer can be a textContent. If so, create a variable (isEqualsPressed) holding
        a false boolean. If equals is pressed, change the isEqualsPressed to true. Also, change the second conditional to 
        isEqualsPressed == true, then change the isEqualsPressed = false after.
        
        4.1.1.1. numberOnScreen = numbers' textContent
        4.1.2. Else
            4.1.2. Append numberOnScreen with the numbers' textContent
5. If any operator is pressed:
    5.1. if operationDone is false:
        5.1.1. Do nothing (break)
    5.2. append numberOnScreen and operator to operation
    5.3. if operation length = 4:
        5.3.1. operate (operation index 0 to 2)
        5.3.2. splice operation [0 to 2], inserting the operate's return
        5.3.4. numberOnScreen = operation[0]
        5.3.5. operationDone = false
    5.4. else:
        5.4.1. push() parseInt(numberOnScreen) to operation 
        5.4.2. push operator to operation
        5.4.3. operationDone = false
6. If equals pressed
    6.1. If operationDone is false:
        6.1.1. Alert "Error: Equals pressed before completing operation."
        6.1.2. Break
    6.2. Else
        6.2.1. operate (operation index 0 to 2)
        6.2.2. splice operation [all], inserting operate's return
        6.2.3. numberOnScreen = operation[0]
        6.2.4. operationDone = true
*/
