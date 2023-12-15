class Sprite {
  constructor(config) {


    // image
    this.image = new Image();
    this.image.src = config.src;
    this.image.onload = () => {
      this.isLoaded = true;
    }

    //Shadow
    this.shadow = new Image();

    this.useShadow = true;
    if (this.useShadow) {
      this.shadow.src = "\PyVentures\assets\images\characters\shadow.png";
    }
    this.shadow.onload = () => {
      this.isShadowLoaded = true;

    }

    //Animation & Initial State
    this.animations = config.animations || {
      "idle-down": [[0, 0]],
      "idle-up": [[0, 1]],
      "idle-right": [[0, 2]],
      "idle-left": [[0, 3]],
      "walk-down": [[0, 0], [1, 0]],
      "walk-right": [[2, 0], [0, 0]],
      "walk-left": [[3, 0], [0, 0]],
      "walk-up": [[0, 1], [1, 1]],
      "miss-quiz": [[0, 3], [1, 3], [2, 3]]
    }
    this.currentAnimation = "idle-down";
    this.currentAnimationFrame = 0;

    this.animationFrameLimit = config.animationFrameLimit || 18;
    this.animationFrameProgress = this.animationFrameLimit;


    //Reference object
    this.gameObject = config.gameObject;
  }

  get frame() {
    return this.animations[this.currentAnimation][this.currentAnimationFrame]
  }

  setAnimation(key) {
    if (this.currentAnimation !== key) {
      this.currentAnimation = key;
      this.currentAnimationFrame = 0;
      this.animationFrameProgress = this.animationFrameLimit;
    }
  }

  updateAnimationProgress() {
    //Downtick frame progress
    if (this.animationFrameProgress > 0) {
      this.animationFrameProgress -= 1;
      return;
    }

    //Reset 
    this.animationFrameProgress = this.animationFrameLimit;
    this.currentAnimationFrame += 1;

    if (this.frame === undefined) {
      this.currentAnimationFrame = 0
    }


  }


  draw(ctx, cameraPerson) {
    const x = this.gameObject.x - 8 + utils.withGrid(10.5) - cameraPerson.x;
    const y = this.gameObject.y - 18 + utils.withGrid(10.75) - cameraPerson.y;

    this.isShadowLoaded && ctx.drawImage(this.shadow, x, y);


    const [frameX, frameY] = this.frame;

    this.isLoaded && ctx.drawImage(this.image,
      frameX * 32, frameY * 32,
      32, 32,
      x, y,
      32, 32
    )

    this.updateAnimationProgress();
  }

}