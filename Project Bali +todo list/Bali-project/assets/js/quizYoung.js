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
    new Question("It's possible to go outside the hotel alone?", [  "Yes", "Possible with a guide", "I don't know", "Only with parents" ], "only with parents"),
    new Question("It's possible to swim alone?", ["Only under the supervision of parents and rescuers","You can't swim", "You can swim", "Can only be done with parental permission"], "Only under the supervision of parents and rescuers"),
    new Question("It's possible to throw garbage on the street?", ["No","Yes", "Can only be thrown into urns"], "Can only be thrown into urns"),
    new Question("It's possible to feed wild animals in zoos, in the forest, reserves", ["You can, but only if there is a sign that you can feed","No", "Yes", "You can, but only if there is a sign that you can feed and a zookeeper is present"], "You can, but only if there is a sign that you can feed and a zookeeper is present"),
    new Question("Is it possible to communicate with strangers on the street?", ["No","Yes", "Yes, if the person looks friendly", "It is possible if it is a family with small children"], "No"),
    new Question("What to do if you are lost?", ["Call for help","Approach people and ask for help", "Call your parents or the hotel if you have a number", "It is possible if it is a family with small children or find the police and ask for help"], "It is possible if it is a family with small children or find the police and ask for help"),
];

//Create Quiz
var quiz = new Quiz(questions);

//Display Quiz
QuizUI.displayNext();