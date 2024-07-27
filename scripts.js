// Variables para el estado de la calculadora
let display = document.getElementById('display');
let currentOperand = '';
let previousOperand = '';
let operation = undefined;

// Función para limpiar el display y resetear los operandos y la operación
function clearDisplay() {
    currentOperand = '';
    previousOperand = '';
    operation = undefined;
    updateDisplay();
}

// Función para agregar un número al operando actual
function appendNumber(number) {
    // Evitar múltiples puntos decimales
    if (number === '.' && currentOperand.includes('.')) return;
    // Concatenar el número al operando actual
    currentOperand = currentOperand.toString() + number.toString();
    updateDisplay();
}

// Función para elegir la operación matemática
function chooseOperation(op) {
    // No hacer nada si el operando actual está vacío
    if (currentOperand === '') return;
    // Si ya hay un operando previo, computar el resultado antes de continuar
    if (previousOperand !== '') {
        compute();
    }
    // Establecer la operación y mover el operando actual al anterior
    operation = op;
    previousOperand = currentOperand;
    currentOperand = '';
    updateDisplay();
}

// Función para computar el resultado de la operación
function compute() {
    let computation;
    const prev = parseFloat(previousOperand); // Convertir el operando previo a número
    const current = parseFloat(currentOperand); // Convertir el operando actual a número

    // Validar que ambos operandos sean números
    if (isNaN(prev) || isNaN(current)) return;
    
    // Realizar la operación correspondiente
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
            // Validar división por cero
            if (current === 0) {
                showError("Error: División por cero");
                return;
            }
            computation = prev / current;
            break;
        case '%':
            computation = (prev * current) / 100;
            break;
        case '^':
            computation = Math.pow(prev, current);
            break;
        case '√':
            // Validar raíz cuadrada de un número negativo
            if (current < 0) {
                showError("Error: Raíz cuadrada de número negativo");
                return;
            }
            computation = Math.sqrt(current);
            break;
        default:
            return;
    }

    // Validar que el resultado no sea demasiado grande
    if (computation > Number.MAX_SAFE_INTEGER) {
        showError("Error: Número demasiado grande");
        return;
    }

    // Redondear el resultado a seis decimales y actualizar el estado
    currentOperand = Math.round(computation * 1000000) / 1000000;
    operation = undefined;
    previousOperand = '';
    updateDisplay();
}

// Función para actualizar el display con los valores actuales
function updateDisplay() {
    if (operation === '√') {
        display.innerText = `√(${currentOperand})`;
    } else if (operation != null && previousOperand !== '') {
        display.innerText = `${previousOperand} ${operation} ${currentOperand || ''}`;
    } else {
        display.innerText = currentOperand || '0';
    }
}

// Función para mostrar el modal de error
function showError(message) {
    document.getElementById('errorMessage').innerText = message;
    $('#errorModal').modal('show');
}

// Función para manejar el clic en el botón de continuar del modal
function continueOperation() {
    $('#errorModal').modal('hide');
    // Aquí puedes realizar otras acciones si es necesario, por ejemplo, reiniciar el estado
}

// Inicializar la calculadora limpiando el display
clearDisplay();

// Añadir el manejador de eventos al botón "Continuar"
document.querySelector('.modal-footer .btn-primary').addEventListener('click', continueOperation);
