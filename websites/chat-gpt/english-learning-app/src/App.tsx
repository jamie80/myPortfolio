import { useState } from "react";
import "./App.css";

const categories = [
  {
    name: "Animals",
    emoji: "🦁",
    color: "orange",
    description: "Meet the animals!",
  },
  {
    name: "Food",
    emoji: "🍓",
    color: "pink",
    description: "Yummy English words!",
  },
  {
    name: "Colors",
    emoji: "🎨",
    color: "blue",
    description: "Discover the colors!",
  },
  {
    name: "Numbers",
    emoji: "🔢",
    color: "green",
    description: "Count in English!",
  },
];

const animals = [
  { name: "Lion", emoji: "🦁" },
  { name: "Elephant", emoji: "🐘" },
  { name: "Monkey", emoji: "🐵" },
  { name: "Giraffe", emoji: "🦒" },
  { name: "Tiger", emoji: "🐯" },
  { name: "Zebra", emoji: "🦓" },
  { name: "Rabbit", emoji: "🐰" },
  { name: "Bear", emoji: "🐻" },
];

const food = [
  { name: "Apple", emoji: "🍎" },
  { name: "Banana", emoji: "🍌" },
  { name: "Bread", emoji: "🍞" },
  { name: "Cheese", emoji: "🧀" },
  { name: "Egg", emoji: "🥚" },
  { name: "Milk", emoji: "🥛" },
  { name: "Pizza", emoji: "🍕" },
  { name: "Strawberry", emoji: "🍓" },
];

const colors = [
  { name: "Red", emoji: "🟥" },
  { name: "Blue", emoji: "🟦" },
  { name: "Green", emoji: "🟩" },
  { name: "Yellow", emoji: "🟨" },
  { name: "Orange", emoji: "🟧" },
  { name: "Purple", emoji: "🟪" },
  { name: "Black", emoji: "⬛" },
  { name: "White", emoji: "⬜" },
];

const numbers = [
  { name: "One", emoji: "1️⃣" },
  { name: "Two", emoji: "2️⃣" },
  { name: "Three", emoji: "3️⃣" },
  { name: "Four", emoji: "4️⃣" },
  { name: "Five", emoji: "5️⃣" },
  { name: "Six", emoji: "6️⃣" },
  { name: "Seven", emoji: "7️⃣" },
  { name: "Eight", emoji: "8️⃣" },
];

type LearningItem = {
  name: string;
  emoji: string;
};

const categoryItems: Record<string, LearningItem[]> = {
  Animals: animals,
  Food: food,
  Colors: colors,
  Numbers: numbers,
};

function shuffleArray(array: number[]) {
  return [...array].sort(() => Math.random() - 0.5);
}

function createAnswerOptions(correctItem: number, items: LearningItem[]) {
  const wrongAnswers = items
    .map((_, index) => index)
    .filter((index) => index !== correctItem);

  const randomWrongAnswers = shuffleArray(wrongAnswers).slice(0, 3);

  return shuffleArray([correctItem, ...randomWrongAnswers]);
}

function App() {
  const [showAnimals, setShowAnimals] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("Animals");
  const currentItems = categoryItems[selectedCategory];

  const currentCategory = categories.find(
    (category) => category.name === selectedCategory,
  );

  const [, setSelectedAnimal] = useState<number | null>(null);
  const [, setAnswerShown] = useState(false);
  const [animalResults, setAnimalResults] = useState<{
    [key: number]: "known" | "practice";
  }>({});
  const [practiceMode, setPracticeMode] = useState(false);
  const [, setPracticeList] = useState<number[]>([]);

  // QUIZ STATE

  const [quizOrder, setQuizOrder] = useState<number[]>([]);
  const [questionPosition, setQuestionPosition] = useState(0);

  const [answerOptions, setAnswerOptions] = useState<number[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);

  const [correctCount, setCorrectCount] = useState(0);
  const [incorrectCount, setIncorrectCount] = useState(0);

  const quizPercentage =
    quizOrder.length > 0
      ? Math.round((correctCount / quizOrder.length) * 100)
      : 0;

  const quizFace =
    quizPercentage >= 90
      ? "🤩"
      : quizPercentage >= 75
        ? "🙂"
        : quizPercentage >= 60
          ? "😐"
          : quizPercentage >= 40
            ? "🙁"
            : "😢";

  const knownCount = Object.values(animalResults).filter(
    (result) => result === "known",
  ).length;

  const practiceCount = Object.values(animalResults).filter(
    (result) => result === "practice",
  ).length;

  const getPracticeList = () => {
    return animals
      .map((_, index) => index)
      .filter((index) => animalResults[index] === "practice");
  };

  const startQuiz = () => {
    const randomOrder = shuffleArray(currentItems.map((_, index) => index));

    setQuizOrder(randomOrder);
    setQuestionPosition(0);
    setSelectedAnswer(null);
    setCorrectCount(0);
    setIncorrectCount(0);

    setAnswerOptions(createAnswerOptions(randomOrder[0], currentItems));
  };

  if (showAnimals) {
    return (
      <main className="app">
        <header className="header">
          <div className="logo">🌟 English Fun!</div>
          <div className="header-label">LEARN • PLAY • GROW</div>
        </header>

        <section className="learning-page">
          <div className="learning-navigation">
            {/* Powrót do strony głównej */}
            <button
              className="back-button"
              onClick={() => {
                setShowAnimals(false);

                setQuizOrder([]);
                setQuestionPosition(0);
                setSelectedAnswer(null);
                setCorrectCount(0);
                setIncorrectCount(0);

                setAnimalResults({});
                setPracticeMode(false);
                setPracticeList([]);
                setSelectedAnimal(null);
                setAnswerShown(false);
              }}
              aria-label="Back to home"
              title="Back to home"
            >
              <svg
                viewBox="0 0 24 24"
                width="27"
                height="27"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M3 10.5L12 3l9 7.5" />
                <path d="M5 9v12h14V9" />
                <path d="M9 21v-7h6v7" />
              </svg>
            </button>

            {/* Powrót do kart zwierząt */}
            {quizOrder.length > 0 && (
              <button
                className="back-button"
                onClick={() => {
                  setQuizOrder([]);
                  setQuestionPosition(0);
                  setSelectedAnswer(null);
                  setCorrectCount(0);
                  setIncorrectCount(0);
                  setAnimalResults({});
                  setPracticeMode(false);
                  setPracticeList([]);
                  setSelectedAnimal(null);
                  setAnswerShown(false);
                }}
                aria-label="Back to animal cards"
                title="Back to animal cards"
              >
                <svg
                  viewBox="0 0 24 24"
                  width="27"
                  height="27"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="3" y="3" width="8" height="8" rx="1" />
                  <rect x="13" y="3" width="8" height="8" rx="1" />
                  <rect x="3" y="13" width="8" height="8" rx="1" />
                  <rect x="13" y="13" width="8" height="8" rx="1" />
                </svg>
              </button>
            )}
          </div>

          {quizOrder.length === 0 && (
            <>
              <h1>
                {currentCategory?.name} {currentCategory?.emoji}
              </h1>
              <p>Learn new English words!</p>
            </>
          )}
          {Object.keys(animalResults).length === animals.length &&
          !practiceMode ? (
            <div className="summary">
              <div className="summary-emoji">🎉</div>

              <h2>Great job!</h2>

              <p>You have completed all animals!</p>

              <div className="summary-stats">
                <div>
                  <span>✓</span>
                  <strong>{knownCount}</strong>
                  <p>Known words</p>
                </div>

                <div>
                  <span>✕</span>
                  <strong>{practiceCount}</strong>
                  <p>To practice</p>
                </div>
              </div>

              <div className="summary-percentage">
                <p>Words you know</p>
                <strong>
                  {Math.round((knownCount / animals.length) * 100)}%
                </strong>
              </div>
              {practiceCount > 0 && (
                <button
                  className="practice-again-button"
                  onClick={() => {
                    const list = getPracticeList();

                    setPracticeList(list);
                    setPracticeMode(true);
                    setSelectedAnimal(list[0]);
                    setAnswerShown(false);
                  }}
                >
                  <span className="practice-again-icon">
                    <svg viewBox="0 0 100 100" aria-hidden="true">
                      <path
                        d="M78 38 A32 32 0 1 0 78 64"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="8"
                        strokeLinecap="round"
                      />
                      <path
                        d="M67 22 L82 36 L62 42"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M39 39 L61 61 M61 39 L39 61"
                        stroke="#dc2626"
                        strokeWidth="9"
                        strokeLinecap="round"
                      />
                    </svg>
                  </span>

                  <span className="practice-again-count">{practiceCount}</span>
                </button>
              )}
              <button
                onClick={() => {
                  setAnimalResults({});
                  setPracticeMode(false);
                  setPracticeList([]);
                  setSelectedAnimal(0);
                  setAnswerShown(false);
                }}
              >
                Learn all
              </button>
              <button
                onClick={() => {
                  setShowAnimals(false);
                  setAnimalResults({});
                  setPracticeMode(false);
                  setPracticeList([]);
                  setSelectedAnimal(null);
                  setAnswerShown(false);
                }}
              >
                Back to home
              </button>
              <button
                onClick={() => {
                  setAnimalResults({});
                  setSelectedAnimal(0);
                  setAnswerShown(false);
                  setPracticeMode(false);
                  setPracticeList([]);
                }}
              >
                Start again ↻
              </button>
            </div>
          ) : quizOrder.length > 0 && questionPosition < quizOrder.length ? (
            <div className="quiz">
              <div className="learning-stats">
                <span>✓ {correctCount}</span>
                <span>✕ {incorrectCount}</span>
              </div>

              <div className="quiz-progress-container">
                <div className="quiz-progress-counter">
                  {questionPosition + 1} / {currentItems.length}
                </div>

                <div className="quiz-progress">
                  <div
                    className="quiz-progress-fill"
                    style={{
                      width: `${((questionPosition + 1) / currentItems.length) * 100}%`,
                    }}
                  />
                </div>
              </div>

              <div className="quiz-image">
                {currentItems[quizOrder[questionPosition]].emoji}
              </div>

              <div className="quiz-answers">
                {answerOptions.map((animalIndex) => (
                  <button
                    key={animalIndex}
                    className={
                      selectedAnswer !== null
                        ? animalIndex === quizOrder[questionPosition]
                          ? "correct"
                          : animalIndex === selectedAnswer
                            ? "incorrect"
                            : ""
                        : ""
                    }
                    onClick={() => {
                      if (selectedAnswer !== null) return;

                      setSelectedAnswer(animalIndex);

                      if (animalIndex === quizOrder[questionPosition]) {
                        setCorrectCount((count) => count + 1);

                        const word = new SpeechSynthesisUtterance(
                          currentItems[animalIndex].name,
                        );

                        word.lang = "en-US";
                        word.rate = 0.85;

                        window.speechSynthesis.cancel();
                        window.speechSynthesis.speak(word);
                      } else {
                        setIncorrectCount((count) => count + 1);
                      }

                      setTimeout(() => {
                        const nextPosition = questionPosition + 1;

                        setQuestionPosition(nextPosition);

                        if (nextPosition < quizOrder.length) {
                          setAnswerOptions(
                            createAnswerOptions(
                              quizOrder[nextPosition],
                              currentItems,
                            ),
                          );
                        }

                        setSelectedAnswer(null);
                      }, 1000);
                    }}
                  >
                    <span>{currentItems[animalIndex].name}</span>

                    {selectedAnswer !== null &&
                      animalIndex === quizOrder[questionPosition] && (
                        <span className="quiz-answer-icon">✓</span>
                      )}

                    {selectedAnswer !== null &&
                      animalIndex === selectedAnswer &&
                      animalIndex !== quizOrder[questionPosition] && (
                        <span className="quiz-answer-icon">✕</span>
                      )}
                  </button>
                ))}
              </div>
            </div>
          ) : quizOrder.length > 0 ? (
            <div className="summary">
              <div className="summary-emoji">{quizFace}</div>

              <div className="summary-stats">
                <div>
                  <span>✓</span>
                  <strong>{correctCount}</strong>
                </div>

                <div>
                  <span>✕</span>
                  <strong>{incorrectCount}</strong>
                </div>
              </div>
              <div className="summary-percentage">
                <strong>{quizPercentage}%</strong>
              </div>
              <button className="start-learning-button" onClick={startQuiz}>
                PLAY AGAIN ↻
              </button>
            </div>
          ) : (
            <>
              <div className="animal-grid">
                {currentItems.map((item) => (
                  <article
                    className="animal-card"
                    key={item.name}
                    onClick={() => {
                      const word = new SpeechSynthesisUtterance(item.name);

                      word.lang = "en-US";
                      word.rate = 0.85;

                      window.speechSynthesis.cancel();
                      window.speechSynthesis.speak(word);
                    }}
                  >
                    <div className="animal-emoji">{item.emoji}</div>
                    <h2>{item.name}</h2>
                  </article>
                ))}
              </div>
              <button className="start-learning-button" onClick={startQuiz}>
                START ▶
              </button>
            </>
          )}
        </section>
      </main>
    );
  }

  return (
    <main className="app">
      <header className="header">
        <div className="logo">🌟 English Fun!</div>
        <div className="header-label">LEARN • PLAY • GROW</div>
      </header>

      <section className="welcome">
        <div>
          <h1>Let's learn English!</h1>
          <p>Choose a category and start learning.</p>
        </div>
        <div className="welcome-emoji">📚</div>
      </section>

      <section className="categories">
        <h2>Choose your topic</h2>

        <div className="category-grid">
          {categories.map((category) => (
            <article
              className={`category-card ${category.color} ${
                category.name === "Animals" ? "active-category" : ""
              }`}
              key={category.name}
              onClick={() => {
                setSelectedCategory(category.name);
                setShowAnimals(true);
              }}
            >
              <div className="category-emoji">{category.emoji}</div>
              <h3>{category.name}</h3>
            </article>
          ))}
        </div>
      </section>

      <footer>
        <p>Made for curious minds 💛</p>
      </footer>
    </main>
  );
}

export default App;
