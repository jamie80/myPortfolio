const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const progressText = document.getElementById("progressText");
const scoreText = document.getElementById("score");
const progressBarFull = document.getElementById("progressBarFull");

let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions = [
  {
    question: "Jak powiedzieć wyraz 'MOTYL'?",
    choice1: "butterfly",
    choice2: "mouse",
    choice3: "horse",
    choice4: "elephant",
    answer: 1,
  },
  {
    question: "Jak powiedzieć wyraz 'PIES'?",
    choice1: "butterfly",
    choice2: "cat",
    choice3: "dog",
    choice4: "giraffe",
    answer: 3,
  },
  {
    question: "Jak powiedzieć wyraz 'ŻYRAFA'?",
    choice1: "zebra",
    choice2: "fish",
    choice3: "crocodile",
    choice4: "giraffe",
    answer: 4,
  },
];

//CONSTANTS
const CORRECT_BOUNS = 10;
const MAX_QUSTIONS = 3;

startGame = () => {
  questionCounter = 0;
  score = 0;
  availableQuestions = [...questions];
  getNewQuestion();
};

getNewQuestion = () => {
  if (availableQuestions.length === 0 || questionCounter >= MAX_QUSTIONS) {
    localStorage.setItem("mostRecentScore", score);
    //Go to the end page
    return window.location.assign("./end.html");
  }

  questionCounter++;
  progressText.innerText = `Wyraz ${questionCounter}/${MAX_QUSTIONS}`;
  //Update the progress bar
  progressBarFull.style.width = `${(questionCounter / MAX_QUSTIONS) * 100}%`;

  const questionIndex = Math.floor(Math.random() * availableQuestions.length);
  currentQuestion = availableQuestions[questionIndex];
  question.innerText = currentQuestion.question;

  choices.forEach((choice) => {
    const number = choice.dataset["number"];
    choice.innerText = currentQuestion["choice" + number];
  });

  availableQuestions.splice(questionIndex, 1);
  acceptingAnswers = true;

  choices.forEach((choice) => {
    choice.addEventListener("click", (e) => {
      if (!acceptingAnswers) return;

      acceptingAnswers = false;
      const selectedChoice = e.target;
      const selectedAnswer = selectedChoice.dataset["number"];

      const classToApply =
        selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";

      if (classToApply === "correct") {
        incrementScore(CORRECT_BOUNS);
      }

      selectedChoice.parentElement.classList.add(classToApply);

      setTimeout(() => {
        selectedChoice.parentElement.classList.remove(classToApply);
        getNewQuestion();
      }, 1000);
    });
  });

  incrementScore = (num) => {
    score += num;
    scoreText.innerText = score;
  };
};
startGame();
