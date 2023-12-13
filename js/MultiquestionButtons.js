class MultiquestionButtons {
    constructor({ text1, text2, text3, onComplete}) {
        this.text1 = text1;
        this.text2 = text2;
        this.text3 = text3;
        this.onComplete = onComplete;
        this.element = null;
        this.selection = null;
       
    }

    createElement() {
        this.element = document.createElement("div");
        this.element.classList.add("MultiquestionButtons");

        this.question()

    }

    question(){
        this.element.innerHTML = (`
            <label>Como eu faço um Hello world em python?</label>
            <button class="Sel1">print('Hello, world!')</button>
            <button class="Sel2">printf('Hello, world!')</button>
            <button class="Sel3">console.log('Hello, world!')</button>
        `);
        
        for (let i = 1; i <= 3; i++) {
            const button = this.element.querySelector(`.Sel${i}`);
            button.addEventListener("click", () => {
                this.selection = i;
                this.check()
            });
        };
    }
    
    check(){

        if (this.selection == 1) {
            this.element.innerHTML = `<label>Você está certo</label>`;
            setTimeout(this.done.bind(this), 800);
        }
        else if (this.selection == 2 || this.selection == 3) {
            this.element.innerHTML = `<label>Você está errado</label>`;
            setTimeout(this.question.bind(this), 800);
        }
    }

    done() {
    
        this.element.remove();
        this.onComplete(this.selection);
    }


    init(container) {
        this.createElement();
        container.appendChild(this.element);
    }
}



/*

    >>>>test

    questionText(){
        
       const questionText = [
       {
            question: "Como eu faço um Hello world em python?",
            answer: [
            {text: "print('Hello, world!')", condition: true},
            {text: "printf('Hello, world!')", condition: false},
            {text: "printf('Hello, world!')", condition: false}

            ]
       },

       //test
        {
            required: ["demo_quiz"],
            question: "something",
            answer: [
            {text: "something else", condition: false},
            {text: "something else else", condition: true},
            {text: "something else else else", condition: false}

            ]

        },
       ];

       const questionElement = document.getElementById("question");
       const answerButtonsContainer = document.getElementById("selection-buttons");

       let currentQuestionIndex = 0;

       function startQuiz() {
           currentQuestionIndex = 0;
           showQuestion();
       }

       function showQuestion(){
        let currentQuestion = questionText[currentQuestionIndex];
        questionElement.innerHTML = currentQuestion.question;

        currentQuestion.answer.forEach((answer, index) => {
            const button = document.createElement("button");
            button.innerHTML = answer.text;
            button.classList.add("btn");
            button.addEventListener("click", () => {
                this.selection = index + 1;
                this.check();
            });
            answerButtonsContainer.appendChild(button);
        });

    }
       startQuiz();


    }
*/  