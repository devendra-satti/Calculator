document.addEventListener('DOMContentLoaded', () => {
    const display = document.getElementById('display');
    const buttons = document.querySelectorAll('.buttons button');
    let currentInput = '';
    let operator = null;
    let firstOperand = null;
    let waitForSecondOperand = false;

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const buttonText = button.textContent;

            if (buttonText === 'C') {
                currentInput = '';
                operator = null;
                firstOperand = null;
                waitForSecondOperand = false;
                display.value = '';
                return;
            }

            if (button.classList.contains('operator')) {
                if (operator && waitForSecondOperand) {
                    // Chain operations
                    firstOperand = calculate(firstOperand, operator, parseFloat(currentInput));
                    display.value = firstOperand;
                } else if (currentInput !== '') {
                    firstOperand = parseFloat(currentInput);
                }
                operator = buttonText;
                currentInput = '';
                waitForSecondOperand = true;
                return;
            }

            if (button.classList.contains('equals')) {
                if (operator && currentInput !== '') {
                    const secondOperand = parseFloat(currentInput);
                    const result = calculate(firstOperand, operator, secondOperand);
                    display.value = result;
                    currentInput = result.toString();
                    operator = null;
                    firstOperand = null;
                    waitForSecondOperand = false;
                }
                return;
            }

            // Handle number and decimal input
            if (buttonText === '.' && currentInput.includes('.')) {
                return;
            }
            currentInput += buttonText;
            display.value = currentInput;
        });
    });

    function calculate(first, op, second) {
        if (op === '+') return first + second;
        if (op === '-') return first - second;
        if (op === '*') return first * second;
        if (op === '/') return second !== 0 ? first / second : 'Error';
        return second;
    }
});
