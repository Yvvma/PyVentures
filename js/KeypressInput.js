class KeypressInput {
    constructor(keyCode, callback){
        let keySafe = true;
        this.keydownFunc = function(event){
            if(event.code === keyCode){
            if(keySafe) {
                keySafe = false;
                callback();
                }
                
            }
        };
        this.keyupFunc = function(event){
            if (event.code === keyCode){
                keySafe = true;
            }
        };

        document.addEventListener("keydown", this.keydownFunc);
        document.addEventListener("keyup", this.keyupFunc);   
    }    

    unbind(){

        document.removeEventListener("keydown", this.keydownFunc);
        document.removeEventListener("keyup", this.keyupFunc);   
    }
    
}