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

let operation = [];
let operationDone = true;

const screen = document.querySelector(".screen");
const clear = document.querySelector(".clear");
const changeSign = document.querySelector(".change-sign");
const percent = document.querySelector(".percent");
const buttons = document.querySelectorAll(".numbers .button");
const operators = document.querySelectorAll(".operators .button")

function numberOnScreen(number) {
    // if (number.toString().includes(".")) {
    //     if (number.split(".")[1].length == 1) {
    //         number = number.toFixed(1).toString();
    //     } else if (number.split(".")[1].length == 2) {
    //         number = number.toFixed(2).toString();
    //     }
    // }
    let checkIfDecimal = number.includes(".");

    if (checkIfDecimal) {
        let numSplitOld = number.split(".");
        numSplit = numSplitOld.map(num => parseInt(num));
        // console.log(numSplit);
        // console.log(number);
        // console.log(typeof number);
        if (numSplit[1].length == 1) {
            number = Number(number).toFixed(1);
        } else if (numSplit[1].length == 2) {
            number = Number(number).toFixed(2);
        }
    }

    // console.log(number);
    // console.log(typeof number);
    screen.textContent = number;
}

numberOnScreen("0");

clear.addEventListener("click", () => {
    // alert("You pressed clear");
    numberOnScreen("0");
    operation.splice(0);
    operationDone = true;
});

changeSign.addEventListener("click", () => {
    numberOnScreen((Number(screen.textContent) * -1).toString());
    isEqualsPressed = false;
});

percent.addEventListener("click", () => {
    numberOnScreen((Number(screen.textContent) / 100).toString());
    isEqualsPressed = false;
});

let isEqualsPressed = false;

buttons.forEach((button) => {
    button.addEventListener("click", () => {
        // alert("You pressed " + button.textContent);
        if ((screen.textContent == "0") || (isEqualsPressed)) {
            numberOnScreen(button.textContent);
            isEqualsPressed = false;
        } else {
            numberOnScreen(screen.textContent + button.textContent);
        }
    });
});

operators.forEach((operator) => {
    operator.addEventListener("click", () => {
        console.log(operationDone);
        if (operator.textContent == "=") {
            if (operationDone == false) {
                alert("Error: Equals pressed before completing operation.");
            } else {
                operation.push(Number(screen.textContent), operator.textContent);
                // console.log(operation);
                let answer = operate(operation[0], operation[2], operation[1]);
                // console.log(answer);
                operation.splice(0, operation.length, answer);
                // console.log(operation);
                operationDone = true;
                isEqualsPressed = true;
                // console.log(operation);
                // console.log(typeof operation[0]);
                numberOnScreen(operation[0].toString());
                operation.splice(0);
            }
        } else {
            if (operationDone) {
                operation.push(Number(screen.textContent), operator.textContent);
                isEqualsPressed = true;
                if (operation.length == 4) {
                    let answer = operate(operation[0], operation[2], operation[1]);
                    operation.splice(0, 3, answer);
                    numberOnScreen(operation[0].toString());
                }
                
            }
        }
        console.log(operation);
    });
});


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
        5.4.1. push() Number(numberOnScreen) to operation 
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
        6.2.5. isEqualPressed = true
*/
