class OvrwrldEvent {
    constructor({ map, event, selection}) {

        this.map = map;
        this.event = event;
        this.condition = selection;
        //map obj working
    }

    
    stand(resolve) {
        const who = this.map.gameObjects[this.event.who];
        who.startBehave({
            map: this.map
        }, {
            type: "stand",
            direction: this.event.direction,
            time: this.event.time
        })

        //Set up handler
        const completeHandler = e => {
            if (e.detail.whoId === this.event.who) {
                document.removeEventListener("CharacterStandingLoop", completeHandler);
                resolve();
            }
        }
        document.addEventListener("CharacterStandingLoop", completeHandler);


    }

    //fix
    walk(resolve) {

        const who = this.map.gameObjects[this.event.who];
        who.startBehave({
            map: this.map
        }, {
            type: "walk",
            direction: this.event.direction,
            retry: true
        })

        //Set up handler
        const completeHandler = e => {
            if (e.detail.whoId === this.event.who) {
                document.removeEventListener("CharacterWalkingLoop", completeHandler);
                resolve();
            }
        }


        document.addEventListener("CharacterWalkingLoop", completeHandler);

        console.log(completeHandler)

    }

    textBox(resolve) {

        //face directions while talking
        if (this.event.faceMainch) {
            const obj = this.map.gameObjects[this.event.faceMainch];
            obj.direction = utils.oppositeDirection(this.map.gameObjects["mainch"].direction);
        }


        const textbx = new TextBox({
            text: this.event.text,
            onComplete: () => resolve()
        })
        textbx.init(document.querySelector(".game-container"));

    }

    pyConsole(resolve) {

        const pyCon = new PyConsole({
            text: this.event.text,
            onComplete: () => resolve()
        })
        pyCon.init(document.querySelector(".game-container"));


    }

    multiquestionButtons(resolve){
        const multiQuestionButtons = new MultiquestionButtons({
            onComplete: () => resolve()
            
        });
        multiQuestionButtons.init(document.querySelector(".game-container"));
    }

    changeMap(resolve) {
        this.map.ovrwrld.startMap(window.OvrwrldMaps[this.event.map]);
        resolve();

    }

    addStoryFlag(resolve){
        window.playerState.storyFlag[this.event.flag] = true;
        resolve();
    }

    //other states 
    init() {
        return new Promise(resolve => {
            this[this.event.type](resolve)
        })


    }

}