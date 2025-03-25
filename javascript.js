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

function roundToHundredths(answer) {
    if (answer.toString().includes(".")) {
        if (answer.toString().split(".")[1].length == 1) {
            return Number(answer.toFixed(1));
        } else {
            return Number(answer.toFixed(2));
        } 
    } else {
        return answer;
    }
}

function operate(firstOperand, secondOperand, operator) {
    operationDone = false;

    if ((operator == "/") && (secondOperand == 0)) {
        operation.splice(0);
        operationDone = true;
        alert("Please don't do that.");
        return 0;
    }

    switch (operator) {
        case "+":
            return roundToHundredths(add(firstOperand, secondOperand));
        case "-":
            return roundToHundredths(subtract(firstOperand, secondOperand));
        case "*":
            return roundToHundredths(multiply(firstOperand, secondOperand));
        case "/":
            return roundToHundredths(divide(firstOperand, secondOperand));
    }
}

let operation = [];
let operationDone = true;
let operationButtonActive = false;

const screen = document.querySelector(".screen");
const clear = document.querySelector(".clear");
const changeSign = document.querySelector(".change-sign");
const percent = document.querySelector(".percent");
const buttons = document.querySelectorAll(".numbers .button");
const operators = document.querySelectorAll(".operators .button")

function numberOnScreen(number) {
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
        operationButtonActive = false;
        // if (!screen.textContent.split("").includes(".")) {
        if (button.textContent == ".") {
            if ((screen.textContent == "0") || (isEqualsPressed)) {
                numberOnScreen(button.textContent);
                isEqualsPressed = false;
            } else if (!screen.textContent.split("").includes(".")) {
                numberOnScreen(screen.textContent + button.textContent);
            }
        } else {
            if ((screen.textContent == "0") || (isEqualsPressed)) {
                numberOnScreen(button.textContent);
                isEqualsPressed = false;
            } else {
                numberOnScreen(screen.textContent + button.textContent);
            }
            
        }
        if (operation.length == 2) {
            operationDone = true;
        } else {
            operationDone = false;
        }
    });
});

operators.forEach((operator) => {
    operator.addEventListener("click", () => {
        // console.log(operationDone);
        if (operator.textContent == "=") {
            if (operationDone == false) {
                alert("Error: Equals pressed before completing operation.");
            //     alert("Error: Equals pressed before completing operation.");
            } else if (operation.length > 1) {
                operation.push(Number(screen.textContent));
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
            if (!operationButtonActive) {
                operation.push(Number(screen.textContent), operator.textContent);
                isEqualsPressed = true;
                operationButtonActive = true;
                if (operation.length == 4) {
                    let answer = operate(operation[0], operation[2], operation[1]);
                    operation.splice(0, 3, answer);
                    numberOnScreen(operation[0].toString());
                }
            } else {
                operation[1] = operator.textContent;
            }
                
            
        }
        console.log(operation);
    });
});

/*
Needed to add/fix:
1. Decimal in operator event listener (fixed)
2. Pressing equals before any operator results in a TypeError (130:45) (fixed)
3. Pressing equals before completing an operation should have an alert message (fixed)
4. Pressing consecutive operations should only take last operator (fixed)
5. Pressing equals after completing an operation should do nothing (fixed)
6. Do not allow typing of multiple decimal points. (Fixed)
7. Dividing by 0 displays an error message (Fixed)
*/


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
