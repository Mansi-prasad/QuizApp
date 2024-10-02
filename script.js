const questions = [
  {
    ques: "Who is the father of PHP?",
    ans: [
      { option: "Drek Kolkevi", correct: false },
      { option: "Rasmus Lerdorf", correct: true },
      { option: "Willam Makepiece", correct: false },
      { option: "List Barely", correct: false },
    ],
  },
  {
    ques: "Which of the following PHP functions can be used for generating unique ids?",
    ans: [
      { option: "md5()", correct: false },
      { option: "uniqueid()", correct: true },
      { option: "mdid()", correct: false },
      { option: " id()", correct: false },
    ],
  },
  {
    ques: "Which one of the following PHP function is used to determine a file’s last access time?",
    ans: [
      { option: "filetime()", correct: false },
      { option: " fileatime()", correct: true },
      { option: "fileltime()", correct: false },
      { option: " filectime()", correct: false },
    ],
  },
  {
    ques: " PHP recognizes constructors by the name _________",
    ans: [
      { option: "function __construct()", correct: true },
      { option: "function _construct()", correct: false },
      { option: "classname()", correct: false },
      { option: "_construct()", correct: false },
    ],
  },
  {
    ques: "The developers of PHP deprecated the safe mode feature as of which PHP version?",
    ans: [
      { option: "PHP 5.3.1", correct: false },
      { option: " PHP 5.3.0", correct: true },
      { option: "PHP 5.1.0", correct: false },
      { option: "PHP 5.2.0", correct: false },
    ],
  },
  {
    ques: " What does PDO stand for?",
    ans: [
      { option: "PHP Database Orientation", correct: false },
      { option: "PHP Data Orientation", correct: false },
      { option: "PHP Data Object", correct: true },
      { option: "PHP Database Object", correct: false },
    ],
  },
  {
    ques: "Which PHP statement will give output as $x on the screen?",
    ans: [
      { option: "echo “$x”;", correct: true },
      { option: "echo “$$x”;", correct: false },
      { option: "echo “/$x”;", correct: false },
      { option: " echo “$x;”;", correct: false },
    ],
  },
  {
    ques: "Which version of PHP introduced the advanced concepts of OOP?",
    ans: [
      { option: "PHP 6", correct: false },
      { option: "PHP 4", correct: false },
      { option: "PHP 5", correct: true },
      { option: "PHP 5.3", correct: false },
    ],
  },
  {
    ques: "Which one of the following is the default PHP session name?",
    ans: [
      { option: "PHPSESSIONID", correct: false },
      { option: "PHPIDSESS", correct: false },
      { option: "PHPSESSID", correct: true },
      { option: "PHPSESID", correct: false },
    ],
  },
];

const questionsEle = document.getElementById("Questions");
const ansBtns = document.getElementById("ans-btn");
const nextBtn = document.getElementById("nextbtn");

let currentQIndex = 0;
let score = 0;
function startQuiz() {
  currentQIndex = 0;
  score = 0;
  nextBtn.innerHTML = "Next";
  showQuestion();
}

function showQuestion() {
  resetState();
  let currentQuestion = questions[currentQIndex];
  let questionNo = currentQIndex + 1;
  // get question with question no
  questionsEle.innerHTML = questionNo + " . " + currentQuestion.ques;
  currentQuestion.ans.forEach((answer) => {
    const button = document.createElement("button");
    button.innerHTML = answer.option;
    button.classList.add("btn");
    ansBtns.appendChild(button);
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
  });
}

function resetState() {
  nextBtn.style.display = "none";
  while (ansBtns.firstChild) {
    ansBtns.removeChild(ansBtns.firstChild);
  }
}

function selectAnswer(e) {
  const selectedBtn = e.target;
  const isCorrect = selectedBtn.dataset.correct === "true";
  if (isCorrect) {
    // alert("you click correct option");
    selectedBtn.classList.add("correct");
    score++;
  } else {
    // alert("you click incorrect option");
    selectedBtn.classList.add("incorrect");
  }
  Array.from(ansBtns.children).forEach((button) => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    }
    button.disabled = true;
  });
  nextBtn.style.display = "block";
}

function showScore() {
  resetState();
  questionsEle.innerHTML = `You Scored ${score} out of ${questions.length}`;
  nextBtn.innerHTML = "Start again";
  nextBtn.style.display = "block";
}

function handleNextBtn() {
  currentQIndex++;
  if (currentQIndex < questions.length) {
    showQuestion();
  } else {
    showScore();
  }
}

nextBtn.addEventListener("click", () => {
  if (currentQIndex < questions.length) {
    handleNextBtn();
  } else {
    startQuiz();
  }
});

startQuiz();
