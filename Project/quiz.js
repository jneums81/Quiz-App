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
const timerElement = document.getElementById('timer'); // Add an HTML element to display the timer
const feedbackElement = document.getElementById('feedback'); // Add an HTML element to display feedback

let interval; // Declare the interval variable outside the startQuiz function

// Function to start the quiz
function startQuiz() {
  // Start the timer countdown
  interval = setInterval(function () {
    timerElement.textContent = `Time: ${timer}`;
    timer--;

    if (timer < 0 || currentQuestionIndex === questions.length) {
      clearInterval(interval);
      // Handle quiz completion and user input here
      handleQuizCompletion();
    }
  }, 1000);

  // Display the first question
  displayQuestion(currentQuestionIndex);
}

// Function to handle quiz completion
function handleQuizCompletion() {
  // Clear the question container
  const questionContainer = document.getElementById('question-container');
  questionContainer.innerHTML = '';

  // Display a message to the user
  if (timer <= 0) {
    feedbackElement.textContent = 'Time is up!';
  } else {
    feedbackElement.textContent = 'Quiz completed!';
  }

  // Allow user input for initials and save data to local storage
  // Redirect to high scores page
}

// Function to display a question
function displayQuestion(index) {
  feedbackElement.textContent = ''; // Clear previous feedback
  const questionContainer = document.getElementById('question-container'); // Add a container for the question
  questionContainer.innerHTML = ''; // Clear previous content

  // Create and display the question
  const question = document.createElement('h1');
  question.textContent = questions[index].question;
  questionContainer.appendChild(question);

  // Create and display answer choices as buttons
  for (let i = 0; i < questions[index].choices.length; i++) {
    const choiceButton = document.createElement('button');
    choiceButton.textContent = questions[index].choices[i];
    // Add event listener to handle user's choice
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
    // Handle correct answer
    score++;
    feedbackElement.textContent = 'Correct!';
  } else {
    // Handle incorrect answer
    timer -= 15;
    if (timer < 0) {
      timer = 0;
    }
    feedbackElement.textContent = 'Incorrect!';
  }

  // Move to the next question
  currentQuestionIndex++;

  if (currentQuestionIndex < questions.length) {
    displayQuestion(currentQuestionIndex);
  } else {
    // Handle quiz completion
    clearInterval(interval);
    handleQuizCompletion();
  }
}

// Add an event listener to start the quiz when a button is clicked
const startButton = document.getElementById('start-button'); // Add a button with this ID in your HTML
startButton.addEventListener('click', startQuiz);

