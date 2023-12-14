class TextBox{
    constructor({text, onComplete}){
        this.text = text;
        this.onComplete = onComplete;
        this.element = null;
    }

    createElement(){
        this.element = document.createElement("div");
        this.element.classList.add("TextBox");

        this.element.innerHTML = (`
            <p class="TextBoxP"></p>
            <button class="TextBoxBtn">Next</button>
        `)

            //Init typewriter effect
            this.typeWrite = new TypeWrite({
                element: this.element.querySelector(".TextBoxP"),
                text: this.text
            })
    

        this.element.querySelector("button").addEventListener("click", () => {
            this.done(); 
        });

        this.actionListener = new KeypressInput("Enter", () => {
          
            this.done();
        })
    
    }

    done(){

        if (this.typeWrite.isDone) {
            this.actionListener.unbind();
            this.element.remove();
            this.onComplete();
          } else {
            this.typeWrite.warpToDone();
          }
     
    }

    init(container){
        this.createElement();
        container.appendChild(this.element)
        this.typeWrite.init();
    }   
}