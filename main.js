class Calculator {
    constructor(previousOperandTextElement, currentOperandTextElement) {
        this.previousOperandTextElement = previousOperandTextElement
        this.currentOperandTextElement = currentOperandTextElement
        this.clear()
    }

    clear() {
        this.currentOperand = ''
        this.previousOperand = ''
        // this.operation = undefined
    }

    delete() {
        this.currentOperand = ""
    }

    appendNum(number) {
        if (number === "." && this.currentOperand.includes(".")) return
        this.currentOperand = this.currentOperand.toString() + number.toString()
    }

    chooseOperation(operation) {
        if (this.currentOperand === '') return
        if (this.previousOperand !== '') {
            this.compute()
        }
        this.operation = operation
        this.previousOperand = this.currentOperand
        this.currentOperand = ''
    }

    compute() {
        let computation;
        const prev = parseFloat(this.previousOperand)
        const curr = parseFloat(this.currentOperand)

        if (isNaN(prev) || isNaN(curr)) return

        switch(this.operation) {
            case '+':
                computation = prev + curr
                break;
            case '-':
                computation = prev - curr
                break;
            case '*':
                computation = prev * curr
                break;
            case '÷':
                computation = prev / curr
                break;
            default:
                return
        }
        this.currentOperand = computation
        this.operation = undefined
        this.previousOperand = ''
    }

    updateDisplay() {
        this.currentOperandTextElement.innerText = this.currentOperand
        this.previousOperandTextElement.innerText = this.previousOperand
    }
}

const numberButtons = document.querySelectorAll('[data-number]')
// const numberButtons = document.getElementById('data-number')
const operationButtons = document.querySelectorAll('[data-operation]')
// const operationButtons = document.getElementById('data-operation')
const equalsButton = document.querySelector('[data-equals]')
// const equalsButton = document.getElementById('data-equals')
const deleteButton = document.querySelector('[data-delete]')
// const deleteButton = document.getElementById('data-delete')
const allClearButton = document.querySelector('[data-all-clear]')
// const allClearButton = document.getElementById('data-all-clear')
const previousOperandTextElement = document.querySelector('[data-previous-operand]')
// const previousOperandTextElement = document.getElementById('data-previous-operand')
const currentOperandTextElement = document.querySelector('[data-current-operand]')
// const currentOperandTextElementText = document.getElementById('data-current-operand')

const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement)

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNum(button.innerText)
        calculator.updateDisplay()
    })
})

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay()
    })
})

equalsButton.addEventListener('click', button => {
    calculator.compute()
    calculator.updateDisplay()
})

deleteButton.addEventListener('click', button => {
    calculator.delete()
    calculator.updateDisplay()
})

allClearButton.addEventListener('click', button => {
    calculator.clear()
    calculator.updateDisplay()
})