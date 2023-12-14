class Characters extends GameObject {
  
  constructor(config) {

    super(config);
    this.movingProgressRemaining = 0;
    this.isStanding = false;

    this.isUserInput = config.isUserInput || false;

    this.directionUpdate = {
      "up": ["y", -1],
      "down": ["y", 1],
      "left": ["x", -1],
      "right": ["x", 1],

    }
  }

  update(state) {
    if (this.movingProgressRemaining > 0) {
      this.updatePosition();
    }

    else {
      //Cases for walk
      //
      //
      //Case: type (key) ready && arrows pressed
      //User Movement
      if (!state.map.isEventPlaying && this.isUserInput && state.arrow) {
        this.startBehave(state, {
          type: "walk",
          direction: state.arrow
        })
      }
      this.updateSprite(state);
    }
  }

  startBehave(state, behave) {
    // Set direction linked to behave
    this.direction = behave.direction;

    if (behave.type === "walk") {
      // Stop if space not free
      if (state.map.isSpaceTaken(this.x, this.y, this.direction)) {
        behave.retry && setTimeout(() => {
          this.startBehave(state, behave)
        }, 10);
        return;
      }

      // Walk
      state.map.moveWall(this.x, this.y, this.direction);
      this.movingProgressRemaining = 16;
      this.updateSprite(state);
     }

    if (behave.type === "stand") {
      this.isStanding = true;
      setTimeout(() => {
        utils.emitEvent("CharacterStandingLoop", {
          whoId: this.id
        })
        this.isStanding = false;
      }, behave.time)
    }
  }

  updatePosition() {
    const [property, change] = this.directionUpdate[this.direction];
    this[property] += change;
    this.movingProgressRemaining -= 1;

    //state npc movement ending
    if (this.movingProgressRemaining === 0) {
 
      //finished npc movement
      utils.emitEvent("CharacterWalkingLoop", {
        whoId: this.id
      })
      
    }
  }

  updateSprite() {
    if (this.movingProgressRemaining > 0) {
      this.sprite.setAnimation("walk-" + this.direction);
      return;
    }
    this.sprite.setAnimation("idle-" + this.direction);
  }
}