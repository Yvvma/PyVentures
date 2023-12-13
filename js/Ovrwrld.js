class Ovrwrld {
 constructor(config) {
   this.element = config.element;
   this.canvas = this.element.querySelector(".game-canvas");
   this.ctx = this.canvas.getContext("2d");
   this.map = null;
 }

  startGameLoop() {
    const step = () => {
      //Clear canvas
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

      //Update Objects
      Object.values(this.map.gameObjects).forEach(object => {
        object.update({
          arrow: this.directionInput.direction,
          map: this.map,

        })
      })

      //Camera person
      const cameraPerson = this.map.gameObjects.mainch;

      //Draw Lower layer
      this.map.drawLowerImage(this.ctx, cameraPerson); 

      //Draw Objects
      Object.values(this.map.gameObjects).sort((a,b) => {
        //layer properties
        return a.x - b.x;
      }).forEach(object => {
        object.sprite.draw(this.ctx, cameraPerson);
      })

      //Draw Upper layer
      this.map.drawUpperImage(this.ctx, cameraPerson);
      
      requestAnimationFrame(() => {
        step();   
      })
    }
    step();
 }

 bindActionInput(){
  new KeypressInput("Enter", () => {
    this.map.checkForActionEvent()  
  })

}

 bindMainchPositionCheck(){
  document.addEventListener("CharacterWalkingLoop", e => {
    if(e.detail.whoId === "mainch"){
      //position changed
      this.map.checkForMovementEvent()
    }
  })
}



  startMap(mapConfig){
    this.map = new OvrwrldMap(mapConfig);
    this.map.ovrwrld = this;
    this.map.mountObjects();

  }

 init() {

  this.startMap(window.OvrwrldMaps.VillageMap);

  this.bindActionInput();
  this.bindMainchPositionCheck();

  this.directionInput = new DirectionInput();
  this.directionInput.init();

  this.startGameLoop();

  this.map.startEvent([
     {type: "textBox", text: "Bem vindo ao PYVenture!!"},
     {type: "textBox", text: "O intuíto deste jogo é ensinar python de uma maneira educativa e intuítiva"},
     {type: "textBox", text: "Primeiramente vá à biblioteca a sua direita"},
     {type: "textBox", text: "Quaisquer outras dúvidas acessar o questionário"},

  ]);

 }
}