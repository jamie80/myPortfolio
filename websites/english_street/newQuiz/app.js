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

  optionContainer.innerHTML = "";
  let animalDelay = 0.15;
  // Create options in html
  for (let i = 0; i < optionLen; i++) {
    // Random option
    const optionIndex =
      availableOptions[Math.floor(Math.random() * availableOptions.length)];
    // Get the position of the 'optionIndex' from the availableOptions
    const index2 = availableOptions.indexOf(optionIndex);
    // Remove the 'optionIndex' from the availableOptions, so that the option does not repeat
    availableOptions.splice(index2, 1);
    const option = document.createElement("div");
    option.innerHTML = currentQuestion.options[optionIndex];
    option.id = optionIndex;
    option.style.animationDelay = animalDelay + "s";
    animalDelay += 0.15;
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
  } else {
    // Set the red color to the incorrect option
    element.classList.add("wrong");
    // If the answer is incorrect, show the correct option by adding green color to the correct option
    const optionLen = optionContainer.children.length;
    for (let i = 0; i < optionLen; i++) {
      if (parseInt(optionContainer.children[i].id) === currentQuestion.answer) {
        optionContainer.children[i].classList.add("correct");
      }
    }
  }

  unclickableOptions();
}

// Make all the options unclickable once the user select an option (restrict the user to change the answer)
function unclickableOptions() {
  const optionLen = optionContainer.children.length;
  for (let i = 0; i < optionLen; i++) {
    optionContainer.children[i].classList.add("already-answered");
  }
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
