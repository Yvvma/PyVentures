class GameObject {
  constructor(config) {

    this.id = null;
    this.isMounted = false;
    this.x = config.x || 0;
    this.y = config.y || 0;
    this.direction = config.direction || "down";
    this.sprite = new Sprite({
      gameObject: this,
      src: config.src || "\PyVentures\assets\images\characters\ch\mainch.png",
    });

    this.behaveLoop = config.behaveLoop || [];
    this.behaveLoopIndex = 0;
    
    this.talking = config.talking || [];
  
  }


  mount(map){
    this.isMounted = true;
    map.addWall(this.x, this.y);

      //if behave, delay kick off
      setTimeout(() =>{
        this.doBehaveEvent(map);
      }, 10)
      
    }
  
  update() {

  }
  
  async doBehaveEvent(map){

    //Do nothing if main event is ocorring
    if (map.isEventPlaying || this.behaveLoop.length === 0 || this.isStanding){
      return;
    }

    //set up event w info
    let eventConfig = this.behaveLoop[this.behaveLoopIndex];
    eventConfig.who = this.id;
    //console.log(eventConfig);

    //create events
    const eventHandler = new OvrwrldEvent ({map, event: eventConfig});
    await eventHandler.init();
    
    //set next maps
    this.behaveLoopIndex += 1;
      if(this.behaveLoopIndex === this.behaveLoop.length) {
        this.behaveLoopIndex = 0;   
      }

    //do function again
    this.doBehaveEvent(map);
   
  }

}