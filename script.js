// Questions Database
const QUESTIONS = [
  {
    q: "What is the full meaning of HTML?",
    o: ["Earth", "Hypertext Markup Language", "Daniel", "Text Markup Language"],
    a: 1, // Index of correct option ("Hypertext Markup Language")
  },
  {
    q: "What is the chemical symbol for gold?",
    o: ["Gd", "Au", "Ag", "Fe"],
    a: 1, // Au
  },
  {
    q: "Which coding language is used for web structure?",
    o: ["Python", "HTML", "CSS", "C++"],
    a: 1, // HTML
  },
  {
    q: "What is the largest continent on Earth",
    o: ["Africa", "Asia", "Europe", "North America"],
    a: 1, // Asia
  },
  {
    q: "What does Js stands for?",
    o: ["Gd", "Javascript", "Ag", "Scripting Language"],
    a: 1, // Javascript
  },
];

// State variables

let currentIndex = 0;
let score = 0;
let timeLeft = 15;
let timer = null;

// Targeting HTML Element

const welcomeScreen = document.getElementById("welcome-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultsScreen = document.getElementById("results-screen");

const questionText = document.getElementById("question-text");
const optionsContainer = document.getElementById("options-container");
const progressText = document.getElementById("progress-text");
const progressBar = document.getElementById("progress-bar");
const timerText = document.getElementById("timer");
const scoreText = document.getElementById("score-text");

const startBtn = document.getElementById("start-btn");
const nextBtn = document.getElementById("next-btn");
const restartBtn = document.getElementById("restart-btn");

// SCREEN TOGGLING
function showScreen(screen) {
  welcomeScreen.classList.add("hide");
  quizScreen.classList.add("hide");
  resultsScreen.classList.add("hide");
  screen.classList.remove("hide");
}

// QUIZ CONTROL
function startQuiz() {
  currentIndex = 0;
  score = 0;
  showScreen(quizScreen);
  loadQuestion();
}

function loadQuestion() {
  const currentQ = QUESTIONS[currentIndex];
  questionText.textContent = currentQ.q;

  // Update progress
  progressText.textContent = Question ${currentIndex + 1} of ${QUESTIONS.length};
  progressBar.style.width = ${((currentIndex + 1) / QUESTIONS.length) * 100}%;

  // Render options
  optionsContainer.innerHTML = "";
  currentQ.o.forEach((option, idx) => {
    const btn = document.createElement("button");
    btn.className = "option-btn";
    btn.textContent = option;
    btn.onclick = () => selectOption(idx);
    optionsContainer.appendChild(btn);
  });

  nextBtn.classList.add("hide");
  startTimer();
}

function selectOption(selectedIdx) {
  clearInterval(timer);
  const currentQ = QUESTIONS[currentIndex];
  const buttons = optionsContainer.children;

  // Disable all options
  for (let btn of buttons) {
    btn.disabled = true;
  }

  // Highlight correct and wrong answers
  buttons[currentQ.a].classList.add("correct");
  if (selectedIdx === currentQ.a) {
    score++;
  } else if (selectedIdx !== -1) {
    buttons[selectedIdx].classList.add("wrong");
  }

  nextBtn.classList.remove("hide");
}

function nextQuestion() {
  currentIndex++;
  if (currentIndex < QUESTIONS.length) {
    loadQuestion();
  } else {
    showResults();
  }
}

function showResults() {
  showScreen(resultsScreen);
  scoreText.textContent = You scored ${score} out of ${QUESTIONS.length}!;
}

// TIMER FUNCTION
function startTimer() {
  clearInterval(timer);
  timeLeft = 15;
  timerText.textContent = Time: ${timeLeft}s;

  timer = setInterval(() => {
    timeLeft--;
    timerText.textContent = Time: ${timeLeft}s;

    if (timeLeft <= 0) {
      clearInterval(timer);
      selectOption(-1); // Auto-reveal answers on timeout
    }
  }, 1000);
}

// EVENT LISTENERS
startBtn.onclick = startQuiz;
nextBtn.onclick = nextQuestion;
restartBtn.onclick = startQuiz;