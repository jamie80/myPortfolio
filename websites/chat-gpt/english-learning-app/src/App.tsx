import { useState, useEffect } from "react";
import "./App.css";

const categoryColors = [
  { background: "#fff0d9", border: "#edc477" },
  { background: "#ffe5ed", border: "#e9a9bf" },
  { background: "#e2edff", border: "#a9c5ef" },
  { background: "#e1f6e9", border: "#a8d8b8" },
  { background: "#eee5ff", border: "#c5adeb" },
  { background: "#fff0e5", border: "#e9c1a2" },
  { background: "#e1f3f5", border: "#a5d1d7" },
  { background: "#f5e9f8", border: "#d6b5df" },
  { background: "#f5f0d9", border: "#d8cc8e" },
  { background: "#e8f0e1", border: "#b7cda5" },
  { background: "#fce8df", border: "#e5b6a4" },
  { background: "#e8e8fa", border: "#b8b8df" },
  { background: "#e4f0e8", border: "#a9cbb5" },
  { background: "#f9e8ef", border: "#dfb2c5" },
  { background: "#e7edf7", border: "#b5c5df" },
  { background: "#f4ebdf", border: "#d8c0a1" },
];

const categories: {
  name: CategoryName;
  emoji: string;
  colorIndex: number;
  description: string;
}[] = [
  {
    name: "Animals",
    emoji: "🦁",
    colorIndex: 0,
    description: "Meet the animals!",
  },
  {
    name: "Food",
    emoji: "🍓",
    colorIndex: 1,
    description: "Yummy English words!",
  },
  {
    name: "Colors",
    emoji: "🎨",
    colorIndex: 2,
    description: "Discover the colors!",
  },
  {
    name: "Numbers",
    emoji: "🔢",
    colorIndex: 3,
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

type CategoryName = "Animals" | "Food" | "Colors" | "Numbers";

const categoryItems: Record<CategoryName, LearningItem[]> = {
  Animals: animals,
  Food: food,
  Colors: colors,
  Numbers: numbers,
};

function shuffleArray(array: number[]) {
  const shuffled = [...array];

  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));

    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  return shuffled;
}

function createAnswerOptions(correctItem: number, items: LearningItem[]) {
  const wrongAnswers = items
    .map((_, index) => index)
    .filter((index) => index !== correctItem);

  const randomWrongAnswers = shuffleArray(wrongAnswers).slice(0, 3);

  return shuffleArray([correctItem, ...randomWrongAnswers]);
}

function speakWord(word: string) {
  const utterance = new SpeechSynthesisUtterance(word);

  utterance.lang = "en-US";
  utterance.rate = 0.85;
  utterance.pitch = 1;

  window.speechSynthesis.cancel();
  window.speechSynthesis.speak(utterance);
}

function App() {
  const [showLearning, setShowLearning] = useState(false);
  const [selectedCategory, setSelectedCategory] =
    useState<CategoryName>("Animals");
  const currentItems = categoryItems[selectedCategory];

  const currentCategory = categories.find(
    (category) => category.name === selectedCategory,
  )!;

  const currentCategoryColor = categoryColors[currentCategory.colorIndex];

  // QUIZ STATE

  const [quizOrder, setQuizOrder] = useState<number[]>([]);
  const [questionPosition, setQuestionPosition] = useState(0);

  const [answerOptions, setAnswerOptions] = useState<number[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);

  const [correctCount, setCorrectCount] = useState(0);
  const [incorrectCount, setIncorrectCount] = useState(0);

  const [showMatch, setShowMatch] = useState(false);
  const [matchOrder, setMatchOrder] = useState<number[]>([]);
  const [matchRound, setMatchRound] = useState(0);
  const [matchedItems, setMatchedItems] = useState<number[]>([]);
  const [draggedItem, setDraggedItem] = useState<number | null>(null);
  const [matchWords, setMatchWords] = useState<number[]>([]);
  const [matchRoundComplete, setMatchRoundComplete] = useState(false);
  const [matchCorrectCount, setMatchCorrectCount] = useState(0);
  const [matchIncorrectCount, setMatchIncorrectCount] = useState(0);
  const [showMatchResults, setShowMatchResults] = useState(false);

  const resetQuiz = () => {
    setQuizOrder([]);
    setQuestionPosition(0);
    setSelectedAnswer(null);
    setCorrectCount(0);
    setIncorrectCount(0);
  };

  const resetMatch = () => {
    setShowMatch(false);
    setShowMatchResults(false);
    setMatchOrder([]);
    setMatchRound(0);
    setMatchedItems([]);
    setDraggedItem(null);
    setMatchWords([]);
    setMatchRoundComplete(false);
    setMatchCorrectCount(0);
    setMatchIncorrectCount(0);
  };

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

  const matchTotalAttempts = matchCorrectCount + matchIncorrectCount;

  const matchPercentage =
    matchTotalAttempts > 0
      ? Math.round((matchCorrectCount / matchTotalAttempts) * 100)
      : 0;

  const matchFace =
    matchPercentage >= 90
      ? "🤩"
      : matchPercentage >= 75
        ? "🙂"
        : matchPercentage >= 60
          ? "😐"
          : matchPercentage >= 40
            ? "🙁"
            : "😢";

  const startQuiz = () => {
    const randomOrder = shuffleArray(currentItems.map((_, index) => index));

    setQuizOrder(randomOrder);
    setQuestionPosition(0);
    setSelectedAnswer(null);
    setCorrectCount(0);
    setIncorrectCount(0);

    setAnswerOptions(createAnswerOptions(randomOrder[0], currentItems));
  };

  useEffect(() => {
    if (!showMatch || !matchRoundComplete) {
      return;
    }

    const timer = setTimeout(() => {
      const nextRound = matchRound + 1;
      const nextWords = matchOrder.slice(nextRound * 4, nextRound * 4 + 4);

      if (nextWords.length > 0) {
        setMatchRound(nextRound);
        setMatchedItems([]);
        setMatchWords(shuffleArray(nextWords));
        setMatchRoundComplete(false);
      } else {
        setShowMatch(false);
        setMatchRoundComplete(false);
        setShowMatchResults(true);
      }
    }, 1200);

    return () => clearTimeout(timer);
  }, [showMatch, matchRoundComplete, matchRound, matchOrder]);

  const startMatch = () => {
    const randomOrder = shuffleArray(currentItems.map((_, index) => index));

    setMatchOrder(randomOrder);
    setMatchRound(0);
    setMatchedItems([]);
    setMatchCorrectCount(0);
    setMatchIncorrectCount(0);
    setDraggedItem(null);
    setMatchWords(shuffleArray(randomOrder.slice(0, 4)));
    setShowMatch(true);
  };

  if (showLearning) {
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
                setShowLearning(false);

                resetQuiz();

                resetMatch();
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

            {/* Powrót do kart */}
            {(showMatch || showMatchResults) && (
              <button
                className="back-button"
                onClick={() => {
                  resetMatch();
                }}
                aria-label={`Back to ${selectedCategory} cards`}
                title={`Back to ${selectedCategory} cards`}
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
            {quizOrder.length > 0 && (
              <button
                className="back-button"
                onClick={() => {
                  resetQuiz();
                }}
                aria-label={`Back to ${selectedCategory} cards`}
                title={`Back to ${selectedCategory} cards`}
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

          {quizOrder.length === 0 && !showMatch && (
            <>
              <h1>
                {currentCategory?.name} {currentCategory?.emoji}
              </h1>
              <p>Learn new English words!</p>
            </>
          )}

          {showMatch ? (
            <div className="match-game">
              <h2>MATCH</h2>
              <p>Match the words with the pictures!</p>

              <div className="match-grid">
                {matchOrder
                  .slice(matchRound * 4, matchRound * 4 + 4)
                  .map((itemIndex) => (
                    <div className="match-card" key={itemIndex}>
                      <div className="match-image">
                        {currentItems[itemIndex].emoji}
                      </div>

                      <div
                        className={`match-drop-zone ${
                          matchedItems.includes(itemIndex) ? "matched" : ""
                        }`}
                        onDragOver={(event) => event.preventDefault()}
                        onDrop={(event) => {
                          event.preventDefault();

                          if (
                            draggedItem === itemIndex &&
                            !matchedItems.includes(itemIndex)
                          ) {
                            const newMatchedItems = [
                              ...matchedItems,
                              itemIndex,
                            ];

                            setMatchedItems(newMatchedItems);
                            setMatchCorrectCount((prev) => prev + 1);
                            speakWord(currentItems[itemIndex].name);

                            if (
                              matchWords.every((word) =>
                                newMatchedItems.includes(word),
                              )
                            ) {
                              setMatchRoundComplete(true);
                            }
                          } else if (
                            draggedItem !== null &&
                            draggedItem !== itemIndex &&
                            !matchedItems.includes(itemIndex)
                          ) {
                            setMatchIncorrectCount((prev) => prev + 1);
                          }

                          setDraggedItem(null);
                        }}
                      >
                        {matchedItems.includes(itemIndex) &&
                          currentItems[itemIndex].name}
                      </div>
                    </div>
                  ))}
              </div>
              <div className="match-words">
                {matchWords
                  .filter((itemIndex) => !matchedItems.includes(itemIndex))
                  .map((itemIndex) => (
                    <div
                      className="match-word"
                      key={itemIndex}
                      draggable
                      onDragStart={() => setDraggedItem(itemIndex)}
                      onDragEnd={() => setDraggedItem(null)}
                    >
                      {currentItems[itemIndex].name}
                    </div>
                  ))}
              </div>
            </div>
          ) : showMatchResults ? (
            <div className="summary">
              <div className="summary-emoji">{matchFace}</div>

              <div className="summary-percentage">
                <strong>{matchPercentage}%</strong>
              </div>

              <button
                className="start-learning-button"
                onClick={() => {
                  setShowMatchResults(false);
                  startMatch();
                }}
              >
                PLAY AGAIN ↻
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

                        speakWord(currentItems[animalIndex].name);
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
              <div className="word-grid">
                {currentItems.map((item) => (
                  <article
                    className="word-card"
                    style={{
                      backgroundColor: currentCategoryColor.background,
                      borderColor: currentCategoryColor.border,
                    }}
                    key={item.name}
                    onClick={() => speakWord(item.name)}
                  >
                    <div className="word-emoji">{item.emoji}</div>
                    <h2>{item.name}</h2>
                  </article>
                ))}
              </div>
              <div className="game-buttons">
                <button className="game-button quiz-button" onClick={startQuiz}>
                  ❓ QUIZ
                </button>

                <button
                  className="game-button match-button"
                  onClick={startMatch}
                >
                  🔗 MATCH
                </button>
              </div>
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
              className="category-card"
              style={{
                backgroundColor: categoryColors[category.colorIndex].background,
                borderColor: categoryColors[category.colorIndex].border,
              }}
              key={category.name}
              onClick={() => {
                setSelectedCategory(category.name);
                setShowLearning(true);
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
