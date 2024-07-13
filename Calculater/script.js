document.addEventListener("DOMContentLoaded", function() {
    const display = document.getElementById('display');
    const buttons = document.querySelectorAll('.btn');
    let currentInput = '';
    let operator = '';
    let firstValue = '';
    let secondValue = '';

    buttons.forEach(button => {
        button.addEventListener('click', function() {
            const value = this.getAttribute('data-value');

            if (value === 'C') {
                currentInput = '';
                operator = '';
                firstValue = '';
                secondValue = '';
                display.textContent = '0';
            } else if (['+', '-', '*', '/'].includes(value)) {
                if (firstValue === '') {
                    firstValue = currentInput;
                } else if (operator) {
                    secondValue = currentInput;
                    const result = calculate(firstValue, operator, secondValue);
                    display.textContent = result;
                    firstValue = result;
                    secondValue = '';
                }
                operator = value;
                currentInput = '';
                display.textContent = firstValue + ' ' + operator;
            } else if (value === '=') {
                if (operator && firstValue !== '' && currentInput !== '') {
                    secondValue = currentInput;
                    const result = calculate(firstValue, operator, secondValue);
                    display.textContent = result;
                    firstValue = result;
                    secondValue = '';
                    operator = '';
                    currentInput = '';
                }
            } else {
                currentInput += value;
                display.textContent = currentInput;
            }
        });
    });

    function calculate(a, operator, b) {
        a = parseFloat(a);
        b = parseFloat(b);
        
        switch (operator) {
            case '+':
                return a + b;
            case '-':
                return a - b;
            case '*':
                return a * b;
            case '/':
                return a / b;
            default:
                return 0;
        }
    }
});
