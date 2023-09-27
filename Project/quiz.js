// Define your questions array here...
var questions = [
    {
        question: "What does HTML stand for?",
        choices: ["Hyper text markup language", "Hyper text martian language", "answer 3", "Answer 4"],
        answer: "Hyper text markup language",
    },
    {
        question: "Commonly used data types DO NOT include",
        choices: ["Strings", "booleans", "alerts", "numbers"],
        answer: "alerts",
    },
    {
        question: "The condition in an if / else statement is enclosed within ____.",
        choices: ["quotes", "curly brackets", "parentheses", "square brackets"],
        answer: "parentheses",
    }
];

// Variables
let currentQuestionIndex = 0;
let score = 0;
let timer = 60; // Initial timer value in seconds
const timerElement = document.getElementById('timer');
const feedbackElement = document.getElementById('feedback');
const initialsForm = document.getElementById('initials-form');
const initialsInput = document.getElementById('initials');
const finalScoreElement = document.getElementById('final-score');

let interval;

// Function to start the quiz
function startQuiz() {
    interval = setInterval(function () {
        timerElement.textContent = `Time: ${timer}`;
        timer--;

        if (timer < 0 || currentQuestionIndex === questions.length) {
            clearInterval(interval);
            handleQuizCompletion();
        }
    }, 1000);

    displayQuestion(currentQuestionIndex);
}

// Function to handle quiz completion
// Function to handle quiz completion
function handleQuizCompletion() {
    const questionContainer = document.getElementById('question-container');
    questionContainer.innerHTML = '';

    if (timer <= 0) {
        feedbackElement.textContent = 'Time is up!';
    } else {
        feedbackElement.textContent = 'Quiz completed!';
    }

    initialsForm.addEventListener('submit', function (event) {
        event.preventDefault();
        const userInitials = initialsInput.value;
        if (userInitials.trim() === '') {
            // Show an error message for empty initials
            feedbackElement.textContent = 'Please enter your initials.';
        } else {
            // Save user's score and initials to local storage
            const highScores = JSON.parse(localStorage.getItem('highScores')) || [];
            highScores.push({ initials: userInitials, score: score });
            localStorage.setItem('highScores', JSON.stringify(highScores));
            // Redirect to high scores page
            window.location.href = 'highscores.html'; // Change this to the correct path of your highscores.html
        }
    });

    finalScoreElement.textContent = `Your score: ${score}`;
}



// Function to display a question
function displayQuestion(index) {
    feedbackElement.textContent = '';
    const questionContainer = document.getElementById('question-container');
    questionContainer.innerHTML = '';

    const question = document.createElement('h1');
    question.textContent = questions[index].question;
    questionContainer.appendChild(question);

    for (let i = 0; i < questions[index].choices.length; i++) {
        const choiceButton = document.createElement('button');
        choiceButton.textContent = questions[index].choices[i];
        choiceButton.addEventListener('click', function () {
            handleAnswerClick(this.textContent);
        });
        questionContainer.appendChild(choiceButton);
    }
}

// Function to handle user's answer choice
function handleAnswerClick(choice) {
    const correctAnswer = questions[currentQuestionIndex].answer;
    if (choice === correctAnswer) {
        score++;
        feedbackElement.textContent = 'Correct!';
    } else {
        timer -= 15;
        if (timer < 0) {
            timer = 0;
        }
        feedbackElement.textContent = 'Incorrect!';
    }

    currentQuestionIndex++;

    if (currentQuestionIndex < questions.length) {
        displayQuestion(currentQuestionIndex);
    } else {
        clearInterval(interval);
        handleQuizCompletion();
    }
}

// Add an event listener to start the quiz when a button is clicked
const startButton = document.getElementById('start-button');
startButton.addEventListener('click', startQuiz);
