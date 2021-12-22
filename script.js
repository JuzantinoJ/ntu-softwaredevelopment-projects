
// questions were taken from https://www.topzenith.com/2020/04/javascript-quiz-with-questions-and-answers.html
//project referenced and explained by https://www.youtube.com/watch?v=bGQ9sIHZdlo


//Create a quiz class
class Quiz {
  constructor(questions) {
    this.score = 0;
    this.questions = questions;
    this.questionIndex = 0;
  }

  // a property to tell us what question we are on through the html id choice0,choice1,choice2,choice3
  getQuestionIndex() {
    return this.questions[this.questionIndex];
  }
  //when a user clicks on a question, if the user gets a correct answer, this.score/or his score gets increased by one. after that the this.questionIndex or the questions will also increase and move to the next question.

  guess(answer) {
    if (this.getQuestionIndex().isCorrectAnswer(answer)) {
      this.score++;
    }
    this.questionIndex++;
  }

  // for when quiz has ended
  isEnded() {
    return this.questionIndex === this.questions.length;
  }
}


//Create a question class
class Question {
  constructor(text, choices, answer) {
    this.text = text;
    this.choices = choices;
    this.answer = answer;
  }
  //when the user clicks the correct answer

  isCorrectAnswer(choice) {
    return this.answer === choice;
  }
}

// Display question. If the quiz has ended it will show the score at the end
function displayQuestion() {
  if (quiz.isEnded()) {
    showScores();
  } else {
    // if the question has not ended it will show the next question.
    let questionElement = document.getElementById("question");
    questionElement.innerHTML = quiz.getQuestionIndex().text;

    // show options. this will show and loop the questions that will be created as an object. 
    let choices = quiz.getQuestionIndex().choices;
    for (let i = 0; i < choices.length; i++) {
      let choiceElement = document.getElementById("choice" + i); //i is the number at the end of choice in html
      choiceElement.innerHTML = choices[i];
      guess("btn" + i, choices[i]);
    }

    showProgress();
  }
};

// Guess function for when user clicks on an option
function guess(id, guess) {
  let button = document.getElementById(id);
  button.onclick = function () {
    quiz.guess(guess);
    displayQuestion();
  }
};


// Show quiz progress
function showProgress() {
  let currentQuestionNumber = quiz.questionIndex + 1;
  let ProgressElement = document.getElementById("progress");
  ProgressElement.innerHTML =
    `Question ${currentQuestionNumber} of ${quiz.questions.length}`;
};
// Show Score
function showScores() {
  let quizEndHTML = `
 <h1>Quiz Completed</h1>
 <h2 id="score">You scored: ${quiz.score} of ${quiz.questions.length}</h2>
 <div class="quiz-repeat">
 <a href="index.html">Take Quiz Again</a>
 </div>
 `;
  let quizElement = document.getElementById("quiz");
  quizElement.innerHTML = quizEndHTML;

}

//create quiz questions
let questions = [
  new Question("Choose the correct answers from the below?", ["Javascript is an extension of the Java programming language", "Javascript is a scripting language but not an object-oriented language", "Javascript is used for manipulating the DOM(Document Object Model) elements of the HTML WebPage", "Javascript is used for form validation only on client-side web applications and it cannot be used on server side"], "Javascript is used for manipulating the DOM(Document Object Model) elements of the HTML WebPage"),

  new Question("Javascript is _ language?", ["Dynamic computer programming language", "Javascript is an object-oriented programming language", "Javascript is a Scripting language", "All the Above"], "All the Above"),

  new Question("What is the correct file extension for Javascript files?", [".java", ".js", ".javascript", ".script"], ".js"),

  new Question("Which of the following is the correct syntax to display “Topzenith.com” in an alert box using JavaScript?", ["alertbox(“topzenith.com”);", "msgbox(“Topzenith.com”);", " alert(“Topzenith.com”);", "msg(“topzenith.com”);"], " alert(“Topzenith.com”);"),
  new Question("What is the output of below? 33 == 33.0", ["False", "33", "True", "None of the above"], "True")
];

let quiz = new Quiz(questions);

//display question
displayQuestion();