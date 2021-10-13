document.addEventListener('DOMContentLoaded', function () {
    let buttons = document.getElementsByTagName('button');

    for (let button of buttons) {
        button.addEventListener('click', function () {
            if (this.getAttribute('data-type') === 'submit') {
                checkAnswer();
            } else {
                let gameType = this.getAttribute('data-type');
                runGame(gameType);
            }
        })
    }
    document.getElementById('answer-box').addEventListener('keydown', function (event) {
        if (event.key === 'Enter') {
            checkAnswer();
        }
    })


    runGame('addition');
})


/**
 * The main game loop, called when the script is loaded
 * and after the user's answer has been proccessed
 */
function runGame(gameType) {

    document.getElementById('answer-box').value = "";
    document.getElementById('answer-box').focus();

    let num1 = Math.floor((Math.random() * 25) + 1);
    let num2 = Math.floor((Math.random() * 25) + 1);

    if (gameType === 'addition') {
        displayAdditionQuestion(num1, num2);
    } else if (gameType === 'subtract') {
        displaySubtractQuestion(num1, num2);
    } else if (gameType === 'multiply') {
        displayMultiplyQuestion(num1, num2);
    } else if (gameType === 'division') {
        displayDivisionQuestion(num1, num2)
    } else {
        alert(`Unknown game type: ${gameType}`);
        throw `Unknown game type: ${gameType}. Aborting!`;
    }
}


/**
 * Checks the user answer against the first element
 * in the returned calculateCorrectAnswer array
 */
function checkAnswer() {

    let userAnswer = parseInt(document.getElementById('answer-box').value);
    let calculatedAnswer = calculateCorrectAnswer();
    let isCorrect = userAnswer === calculatedAnswer[0];

    if (isCorrect) {
        alert(' Horray, your answer is correct');
        incrementScore();
    } else {
        alert(`To bad, your answer: ${userAnswer} is wrong! The correct answer is: ${calculatedAnswer[0]}`);
        incrementWrongScore();
    }

    runGame(calculatedAnswer[1]);

}

/**
 * Get the operands (numbers) and the operator (plus, minus, multiply)
 * directly from the DOM and return the correct answer.
 */
function calculateCorrectAnswer() {
    let operand1 = parseInt(document.getElementById('operand1').innerText);
    let operand2 = parseInt(document.getElementById('operand2').innerText);
    let operator = document.getElementById('operator').innerText;

    if (operator === '+') {
        return [operand1 + operand2, 'addition'];
    } else if (operator === '-') {
        return [operand1 - operand2, 'subtract'];
    } else if (operator === 'x') {
        return [operand1 * operand2, 'multiply'];
    } else if (operator === '/' ) {
        return [operand1 / operand2, 'division'];
    } else {
        alert(`unimplemented operator: ${operator}`);
        throw `unimplemented operator: ${operator}. Aborting!`;
    }

}

/**
 * Gets the score from the DOM and increments it by 1 
 */
function incrementScore() {

    let oldScore = parseInt(document.getElementById('score').innerText);
    document.getElementById('score').innerText = ++oldScore;
}

/**
 * Gets the current tally of incorrect answers from the from the DOM and increments it by 1 
 */
function incrementWrongScore() {

    let oldScore = parseInt(document.getElementById('incorrect').innerText);
    document.getElementById('incorrect').innerText = ++oldScore;

}

function displayAdditionQuestion(operand1, operand2) {

    document.getElementById('operand1').textContent = operand1;
    document.getElementById('operand2').textContent = operand2;
    document.getElementById('operator').textContent = '+';


}

function displaySubtractQuestion(operand1, operand2) {

    document.getElementById('operand1').textContent = operand1 > operand2 ? operand1 : operand2;
    document.getElementById('operand2').textContent = operand1 > operand2 ? operand2 : operand1;
    document.getElementById('operator').textContent = '-';
}

function displayMultiplyQuestion(operand1, operand2) {

    document.getElementById('operand1').textContent = operand1;
    document.getElementById('operand2').textContent = operand2;
    document.getElementById('operator').textContent = 'x';

}

function displayDivisionQuestion(operand1, operand2) {
    document.getElementById('operand1').textContent = operand1 > operand2 ? (operand1 * operand2) : (operand2 * operand1);
    document.getElementById('operand2').textContent = operand1 > operand2 ? operand2 : operand1;
    document.getElementById('operator').textContent = '/';

}