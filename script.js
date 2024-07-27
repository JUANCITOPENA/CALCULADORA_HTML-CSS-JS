let display = document.getElementById('display');
let currentOperand = '';
let previousOperand = '';
let operation = undefined;

function clearDisplay() {
    currentOperand = '';
    previousOperand = '';
    operation = undefined;
    updateDisplay();
}

function appendNumber(number) {
    if (number === '.' && currentOperand.includes('.')) return;
    currentOperand = currentOperand.toString() + number.toString();
    updateDisplay();
}

function chooseOperation(op) {
    if (currentOperand === '') return;
    if (previousOperand !== '') {
        compute();
    }
    operation = op;
    previousOperand = currentOperand;
    currentOperand = '';
    updateDisplay();
}

function compute() {
    let computation;
    const prev = parseFloat(previousOperand);
    const current = parseFloat(currentOperand);

    if (isNaN(prev) || isNaN(current)) return;
    
    switch (operation) {
        case '+':
            computation = prev + current;
            break;
        case '-':
            computation = prev - current;
            break;
        case '*':
            computation = prev * current;
            break;
        case '/':
            computation = prev / current;
            break;
        case '%':
            computation = (prev * current) / 100;
            break;
        case '^':
            computation = Math.pow(prev, current);
            break;
        case '√':
            computation = Math.sqrt(current);
            break;
        default:
            return;
    }

    currentOperand = Math.round(computation * 1000000) / 1000000;
    operation = undefined;
    previousOperand = '';
    updateDisplay();
}

function updateDisplay() {
    if (operation === '√') {
        display.innerText = `√(${currentOperand})`;
    } else if (operation != null && previousOperand !== '') {
        display.innerText = `${previousOperand} ${operation} ${currentOperand || ''}`;
    } else {
        display.innerText = currentOperand || '0';
    }
}

clearDisplay();
