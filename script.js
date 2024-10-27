import { allQuestion } from "./assets/quiz_questions.js";
const timer = document.getElementById("timer");
const progressbar = document.getElementById("progress-bar");
const quizHeader = document.getElementById("quiz-header");
const quizFooter = document.getElementById("quiz-footer");
const landingForm = document.getElementById("quiz-home");
const quizContent = document.getElementById("quiz-content");
const timeLeft = document.getElementById("time-left");
const footerNumber = document.getElementById("curr-ques");

let question = document.createElement("span");
question.id = "question";
let questionNumber = document.createElement("span");
questionNumber.id = "question-number";;
let questionheading = document.createElement("h2");
questionheading.classList.add("question");
let optionsContainer = document.createElement("div");
optionsContainer.id = "all-options";


let level = "";

let questionNo = 1;
let totalques = allQuestion.length;
let quizlength = 5;
let questionIntervalTime = 3000;
let showAnsTime = 1000;
let questionInterval = null;
let allSelectedQues = [];
let allSelectedOptns = [];


const runApp = () => {
    timer.remove();
    progressbar.classList.add("small-screen");
    quizHeader.classList.add("home-screen");
    quizContent.innerHTML="";
    quizContent.append(landingForm);
    quizFooter.remove();
    progressbar.style.width = "100%";
}
runApp();

const removeHomeScreen = () => {
    quizHeader.append(timer);
    timer.id = "timer";
    progressbar.classList.remove("small-screen");
    quizHeader.classList.remove("home-screen");
    document.body.firstElementChild.append(quizFooter);
    quizContent.innerHTML = "";
}

const setLevel = (level) => {
    if (level === "adv") {
        questionIntervalTime = 10000;
    }
    if (level === "medium") {
        questionIntervalTime = 15000;
        showAnsTime = 2000;
    }
    if (level === "beg") {
        questionIntervalTime = 30000;
        showAnsTime = 3000;
    }
}

const startQuiz = (e) => {
    e.preventDefault();
    level = document.getElementById("level").value;
    setLevel(level);
    removeHomeScreen();


    showQuestion();
}


landingForm.addEventListener("submit", startQuiz);




let loadOptions = (index) => {
    optionsContainer.innerHTML = "";
    const correctAnswer = allQuestion[index].answer;

    const checkAns = (event) => {
        removeListeners();
        const button = event.currentTarget;
        const icon = button.querySelector("img");

        if (button.innerText === correctAnswer) {
            button.classList.add("correct");
            icon.classList.add("correct-icon");
        } else {
            button.classList.add("incorrect");
            icon.classList.add("incorrect-icon");
        }

        optionsContainer.querySelectorAll(".quiz-option").forEach((optButton) => {
            if (optButton.innerText === correctAnswer) {
                optButton.classList.add("correct");
                optButton.querySelector("img").classList.add("correct-icon");
                allSelectedOptns.push([button, optButton]);
            }
        });

        clearInterval(questionInterval);
        setTimeout(showQuestion, showAnsTime);
    }

    const removeListeners = () => {
        optionsContainer.querySelectorAll(".quiz-option").forEach((optButton) => {
            optButton.removeEventListener("click", checkAns);
        });
    };

    allQuestion[index].options.forEach((el) => {
        let button = document.createElement("button");
        button.classList.add("quiz-option");

        let optionVal = document.createElement("div");
        optionVal.innerText = el;

        let icon = document.createElement("img");
        button.append(optionVal, icon);
        optionsContainer.append(button);

        button.addEventListener("click", checkAns);
    });

    quizContent.append(optionsContainer);
}

let clearTimer = () => {
    clearInterval(questionInterval);
    showQuestion();
}

let startTimer = () => {
    let remainingTime = questionIntervalTime;
    if (questionInterval) clearInterval(questionInterval);
    let pWidth = 0;
    questionInterval = setInterval(() => {
        remainingTime -= 10;
        pWidth += (1000 / questionIntervalTime);
        timeLeft.innerText = `${remainingTime / 1000} Secs`;
        progressbar.style.width = `${pWidth}%`;
        if (remainingTime <= 0)
            clearTimer();
    }, 100)
}

let showResult = () => {
    let correct = quizlength;
    for (let i = 0; i < quizlength; i++) {
        let question = document.createElement("h2");
        question.innerText = `${i+1}. ${allSelectedQues[i]}`;
        quizContent.append(question);
        quizContent.append(allSelectedOptns[i][0])
        if (allSelectedOptns[i][0] != allSelectedOptns[i][1]){
            quizContent.append(allSelectedOptns[i][1]);
            correct--;
        }
    }
    let result = document.createElement("h2");
    result.innerText = ` Result :  ${correct}/${quizlength}`;
    quizContent.append(result);
    let reset = document.createElement("button");
    reset.innerText = "Restart Quiz";
    reset.classList.add("reset");
    reset.addEventListener("click",runApp);
    quizContent.append(reset);
    quizFooter.remove();
}

let showQuestion = () => {
    quizContent.innerHTML = "";
    if (questionNo <= quizlength) {
        startTimer();
    }
    else {
        console.log(allSelectedQues);
        console.log(allSelectedOptns);
        showResult();
        return;
    }
    footerNumber.innerText = questionNo;

    questionheading.innerHTML = "";
    let currQIndex = Math.floor(Math.random() * totalques);
    questionNumber.innerText = questionNo;

    let space = document.createElement("span");
    space.innerText = ". ";
    question.textContent = allQuestion[currQIndex].question;
    questionheading.append(questionNumber, space, question);
    quizContent.append(questionheading);
    allSelectedQues.push(allQuestion[currQIndex].question);
    loadOptions(currQIndex);
    questionNo++;
    console.log(questionNo);

}








// showQuestion();




