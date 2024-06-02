const questionNumber = document.querySelector(".question-number");
const questionText = document.querySelector(".question-text");
const optionContainer = document.querySelector(".option-container");

let questionCounter = 0;
let currentQuestion;
let availableQuestions = [];
let availableOptions = [];

// Push the questions into availableQuestions Array
function setAvailableQuestions() {
  const totalQuestion = quiz.length;
  for (let i = 0; i < totalQuestion; i++) {
    availableQuestions.push(quiz[i]);
  }
}

// Set question number, question, options
function getNewQuestion() {
  // Set question number
  questionNumber.innerHTML =
    "Pytanie " + (questionCounter + 1) + " z " + quiz.length;

  // Set question text
  // Get random question
  const questionIndex =
    availableQuestions[Math.floor(Math.random() * availableQuestions.length)];
  currentQuestion = questionIndex;
  questionText.innerHTML = currentQuestion.q;
  // Get the position of 'questionIndex' from the availableQuestion Array
  const index1 = availableQuestions.indexOf(questionIndex);
  // Remove the 'questionIndex' from the availableQuestion Array, so that the question does not repeat
  availableQuestions.splice(index1, 1);

  // Set options
  // Get the length of options
  const optionLen = currentQuestion.options.length;
  // Push options into availableOptions Array
  for (let i = 0; i < optionLen; i++) {
    availableOptions.push(i);
  }
  // Create options in html
  for (let i = 0; i < optionLen; i++) {
    const option = document.createElement("div");
    option.innerHTML = currentQuestion.options[i];
    option.id = i;
    option.className = "option";
    optionContainer.appendChild(option);
  }

  questionCounter++;
}

function next() {
  if (questionCounter === quiz.length) {
    console.log("Quiz over");
  } else {
    getNewQuestion();
  }
}

window.onload = function () {
  // First we set all questions in availableQuestions Array
  setAvailableQuestions();
  // Second we call getNewQuestion() Function
  getNewQuestion();
};
