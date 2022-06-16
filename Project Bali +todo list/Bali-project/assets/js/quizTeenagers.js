function Quiz(questions) {
    this.score = 0;
    this.questions = questions;
    this.currentQuestionIndex = 0;
}

Quiz.prototype.guess = function(answer) {
    if(this.getCurrentQuestion().isCorrectAnswer(answer)) {
        this.score++;
    }
    this.currentQuestionIndex++;
};

Quiz.prototype.getCurrentQuestion = function() {
    return this.questions[this.currentQuestionIndex];
};

Quiz.prototype.hasEnded = function() {
    return this.currentQuestionIndex >= this.questions.length;
};
function Question(text, choices, answer) {
    this.text = text;
    this.choices = choices;
    this.answer = answer;
}

Question.prototype.isCorrectAnswer = function (choice) {
    return this.answer === choice;
};
var QuizUI = {
    displayNext: function () {
        if (quiz.hasEnded()) {
            this.displayScore();
        } else {
            this.displayQuestion();
            this.displayChoices();
            this.displayProgress();
        }
    },
    displayQuestion: function() {
        this.populateIdWithHTML("question", quiz.getCurrentQuestion().text);
    },
    displayChoices: function() {
        var choices = quiz.getCurrentQuestion().choices;

        for(var i = 0; i < choices.length; i++) {
            this.populateIdWithHTML("choice" + i, choices[i]);
            this.guessHandler("guess" + i, choices[i]);
        }
    },
    displayScore: function() {
        var gameOverHTML = "<h1>Game Over</h1>";
        gameOverHTML += "<h2> Your score is: " + quiz.score + "</h2>";
        this.populateIdWithHTML("quiz", gameOverHTML);
    },
    
    populateIdWithHTML: function(id, text) {
        var element = document.getElementById(id);
        element.innerHTML = text;
    },
    guessHandler: function(id, guess) {
        var button = document.getElementById(id);
        button.onclick = function() {
            quiz.guess(guess);
            QuizUI.displayNext();
        }
    },
    
    displayProgress: function() {
        var currentQuestionNumber = quiz.currentQuestionIndex + 1;
        this.populateIdWithHTML("progress", "Question " + currentQuestionNumber + " of " + quiz.questions.length);
    }
};
//Create Questions
var questions = [
    new Question("Can you drink alcoholic beverages in a public place?", [ "Yes, if no one sees", "Yes", "No, there will be punishment for that.", "You can, but only if the alcohol is poured into another bottle or disguised" ], "No, there will be punishment for that."),
    new Question("Can you drive a car or moped without a driver license?", ["It's possible, they won't stop me anyway","You can't, it could lead to jail", "Yes, i can if I have a map and I know the area", "You can if you ride near the hotel"], "You can't, it could lead to jail"),
    new Question("it's possible to take pictures in public places?", ["You can, if you don't photograph what is forbidden to photograph","Yes", "No, it's against the law"], "You can, if you do not photograph what is forbidden to photograph"),
    new Question("where to leave documents?", ["In a hotel room in a safe","Carry with you", "Leave at the reception", "You can lose them, I don't need them anyway"], "In a hotel room in a safe"),
    new Question("How to protect yourself from the sun?", ["Take sunscreen","Lie under an umbrella", "Don't go out into the sun", "All answer options are correct"], "All answer options are correct")
];

//Create Quiz
var quiz = new Quiz(questions);

//Display Quiz
QuizUI.displayNext();