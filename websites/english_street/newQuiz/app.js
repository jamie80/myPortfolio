const questionNumber = document.querySelector(".question-number");
const questionText = document.querySelector(".question-text");
const optionContainer = document.querySelector(".option-container");
const answersIndicatorContainer = document.querySelector(".answers-indicator");
const homeBox = document.querySelector(".home-box");
const quizBox = document.querySelector(".quiz-box");
const resultBox = document.querySelector(".result-box");

let questionCounter = 0;
let currentQuestion;
let availableQuestions = [];
let availableOptions = [];
let correctAnswers = 0;
let attempt = 0;

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
  // #### IMAGES ####
  // Show question img if 'img' property exists
  if (currentQuestion.hasOwnProperty("img")) {
    const img = document.createElement("img");
    img.src = currentQuestion.img;
    img.classList.add("question-image");
    questionText.appendChild(img);
  }

  // Set options
  // Get the length of options
  const optionLen = currentQuestion.options.length;
  // Push options into availableOptions Array
  for (let i = 0; i < optionLen; i++) {
    availableOptions.push(i);
  }

  optionContainer.innerHTML = "";
  let animationDelay = 0.15;
  // Create options in html
  for (let i = 0; i < optionLen; i++) {
    // Random option
    const optionIndex =
      availableOptions[Math.floor(Math.random() * availableOptions.length)];
    // Get the position of the 'optionIndex' from the availableOptions Array
    const index2 = availableOptions.indexOf(optionIndex);
    // Remove the 'optionIndex' from the availableOptions Array, so that the option does not repeat
    availableOptions.splice(index2, 1);
    const option = document.createElement("div");
    option.innerHTML = currentQuestion.options[optionIndex];
    option.id = optionIndex;
    option.style.animationDelay = animationDelay + "s";
    animationDelay += 0.15;
    option.className = "option";
    optionContainer.appendChild(option);
    option.setAttribute("onclick", "getResult(this)");
  }

  questionCounter++;
}

// Get the result of current attempt question
function getResult(element) {
  const id = parseInt(element.id);
  // get the answer by comparing the id of clicked option
  if (id === currentQuestion.answer) {
    // Set the green color to the correct option
    element.classList.add("correct");
    // Add the indicator to correct mark
    updateAnswerIndicator("correct");
    correctAnswers++;
  } else {
    // Set the red color to the incorrect option
    element.classList.add("wrong");
    // Add the indicator to wrong mark
    updateAnswerIndicator("wrong");

    // If the answer is incorrect, show the correct option by adding green color to the correct option
    const optionLen = optionContainer.children.length;
    for (let i = 0; i < optionLen; i++) {
      if (parseInt(optionContainer.children[i].id) === currentQuestion.answer) {
        optionContainer.children[i].classList.add("correct");
      }
    }
  }
  attempt++;
  unclickableOptions();
}

// Make all the options unclickable once the user select an option (restrict the user to change the answer)
function unclickableOptions() {
  const optionLen = optionContainer.children.length;
  for (let i = 0; i < optionLen; i++) {
    optionContainer.children[i].classList.add("already-answered");
  }
}

function answersIndicator() {
  answersIndicatorContainer.innerHTML = "";
  const totalQuestion = quiz.length;
  for (let i = 0; i < totalQuestion; i++) {
    const indicator = document.createElement("div");
    answersIndicatorContainer.appendChild(indicator);
  }
}

function updateAnswerIndicator(markType) {
  answersIndicatorContainer.children[questionCounter - 1].classList.add(
    markType
  );
}

function next() {
  if (questionCounter === quiz.length) {
    quizOver();
  } else {
    getNewQuestion();
  }
}

function quizOver() {
  // Hide quizBox
  quizBox.classList.add("hide");
  // Show resultBox
  resultBox.classList.remove("hide");
  quizResult();
}

// Get the quiz results
function quizResult() {
  resultBox.querySelector(".total-question").innerHTML = quiz.length;
  resultBox.querySelector(".total-attempt").innerHTML = attempt;
  resultBox.querySelector(".total-correct").innerHTML = correctAnswers;
  resultBox.querySelector(".total-wrong").innerHTML = attempt - correctAnswers;
  const percentage = (correctAnswers / quiz.length) * 100;
  resultBox.querySelector(".percentage").innerHTML =
    percentage.toFixed(2) + "%";
  resultBox.querySelector(".total-score").innerHTML =
    correctAnswers + "/" + quiz.length;
}

function resetQuiz() {
  questionCounter = 0;
  correctAnswers = 0;
  attempt = 0;
}

function tryAgainQuiz() {
  // Hide the resultBox
  resultBox.classList.add("hide");
  // Shoe the quizBox
  quizBox.classList.remove("hide");
  resetQuiz();
  startQuiz();
}

function goToHome() {
  // Hide resultBox
  resultBox.classList.add("hide");
  // Show homeBox
  homeBox.classList.remove("hide");
  resetQuiz();
}

// #### STARTING POINT ####

function startQuiz() {
  // Hide homeBox
  homeBox.classList.add("hide");
  // Show quizBox
  quizBox.classList.remove("hide");
  // First we set all questions in availableQuestions Array
  setAvailableQuestions();
  // Second we call getNewQuestion() Function
  getNewQuestion();
  // To create indicator of answers
  answersIndicator();
}

window.onload = function () {
  homeBox.querySelector(".total-question").innerHTML = quiz.length;
};
