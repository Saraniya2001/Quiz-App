const questions=[
    {
        question:" The function and var are known as:",
        answers:[
            {text:"Keywords", correct:false},
            {text:"Data types", correct:false},
            {text:"Declaration statements", correct:true},
            {text:"Prototypes", correct:false},
        ]
    },
    {
        question:" Which of the following type of a variable is volatile?",
        answers:[
            {text:"Mutable variable", correct:true},
            {text:"Dynamic variable", correct:false},
            {text:"Volatile variable", correct:false},
            {text:"Immutable variable", correct:false},
        ]
    },
    {
        question:"Which one of the following is the correct way for calling the JavaScript code?",
        answers:[
            {text:"Preprocessor", correct:false},
            {text:"Triggering Event", correct:false},
            {text:"RMI", correct:false},
            {text:"Function/Method", correct:true},
        ]
    },
    {
        question:" When there is an indefinite or an infinite value during an arithmetic computation in a program, then JavaScript prints______.",
        answers:[
            {text:"Prints an exception error", correct:false},
            {text:"Prints an overflow error", correct:false},
            {text:"Displays Infinity", correct:true},
            {text:"Prints the value as such", correct:false},
        ]
    },
    {
        question:" In the JavaScript, which one of the following is not considered as an error:",
        answers:[
            {text:"Syntax error", correct:false},
            {text:"Missing of semicolons", correct:false},
            {text:"Division by zero", correct:true},
            {text:"Missing of Bracket", correct:false},
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex=0;
let score=0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion=questions[currentQuestionIndex];
    let questionNo=currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer=>{
        const button = document.createElement("button");
        button.innerHTML=answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click",selectAnswer);
    });
}

function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct ==="true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }
    else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = `Your score is ${score}  out of ${questions.length}!`;
    nextButton.innerHTML = "Attempt Quiz Again";
    nextButton.style.display = "block";
}

function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        currentQuestionIndex = 0; 
        showScore();
    }
}



nextButton.addEventListener("click",()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }
    else{
        startQuiz();
    }
})



startQuiz();