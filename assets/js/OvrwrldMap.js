class OvrwrldMap {
  constructor(config) {
    this.gameObjects = config.gameObjects;
    this.eventSpace = config.eventSpace || {};
    this.walls = config.walls || {};

    this.lowerImage = new Image();
    this.lowerImage.src = config.lowerSrc;

    this.upperImage = new Image();
    this.upperImage.src = config.upperSrc;

    this.isEventPlaying = false;

   
  }

  drawLowerImage(ctx, cameraPerson) {
    ctx.drawImage(this.lowerImage,
      utils.withGrid(10.5) - cameraPerson.x,
      utils.withGrid(10.75) - cameraPerson.y
    )
  }

  drawUpperImage(ctx, cameraPerson) {
    ctx.drawImage(this.upperImage,
      utils.withGrid(10.5) - cameraPerson.x,
      utils.withGrid(10.75) - cameraPerson.y
    )
  }


  isSpaceTaken(currentX, currentY, direction) {
    const { x, y } = utils.nextPos(currentX, currentY, direction);
    return this.walls[`${x}, ${y}`] || false;
  }

  mountObjects() {
    Object.keys(this.gameObjects).forEach(key => {

      let obj = this.gameObjects[key];
      obj.id = key;
      //make: Says if object should mount 
      obj.mount(this);

    })
  }

  async startEvent(events) {

    this.isEventPlaying = true;
    for (let i = 0; i < events.length; i++) {
      //start loop of async
      const eventHandler = new OvrwrldEvent({
        event: events[i],
        map: this,
      })
      //await each statement
      await eventHandler.init();
    }

    this.isEventPlaying = false;

    Object.values(this.gameObjects).forEach(object => object.doBehaveEvent(this));

  }

  checkForActionEvent() {

    const mainch = this.gameObjects["mainch"];
    const nextCoords = utils.nextPos(mainch.x, mainch.y, mainch.direction);
    const match = Object.values(this.gameObjects).find(object => {
      return `${object.x},${object.y}` === `${nextCoords.x},${nextCoords.y}`
    });

    //start event
    if  (!this.isEventPlaying && match && match.talking.length) {
      
      const mainScene = match.talking.find(scene => {
        return(scene.required || []).every(sf => {
          return playerState.storyFlag[sf]   
        })
      })

      mainScene && this.startEvent(mainScene.events)
    }

  }

  checkForMovementEvent() {
    const mainch = this.gameObjects["mainch"];
    const match = this.eventSpace[`${mainch.x}, ${mainch.y}`];
    if (!this.isEventPlaying && match) {
      this.startEvent(match[0].events)
    }
  }

  //Control colisions w/ other NPC's
  addWall(x, y) {
    this.walls[`${x}, ${y}`] = true;
  }
  removeWall(x, y) {
    delete this.walls[`${x}, ${y}`];
  }
  moveWall(wasX, wasY, direction) {
    this.removeWall(wasX, wasY);
    const { x, y } = utils.nextPos(wasX, wasY, direction);
    this.addWall(x, y);
  }


}

window.OvrwrldMaps = {

  VillageMap: {
    lowerSrc: "\PyVentures\assets\images\maps\VillageMapLo.png",
    upperSrc: "\PyVentures\assets\images\maps\VillageMapUp.png",

    gameObjects: {
      mainch: new Characters({
        isUserInput: true,
        x: utils.withGrid(8),
        y: utils.withGrid(9),
      }),

      npc3: new Characters({
        x: utils.withGrid(6),
        y: utils.withGrid(9),
        src: "\PyVentures\assets\images\characters\ch\npc3.png",
        behaveLoop: [
          {type: "stand", direction: "down", time: 600},
          {type: "stand", direction: "up", time: 800},
          {type: "stand", direction: "right", time: 800},
          {type: "stand", direction: "left", time: 800},
        ],

        talking: [
          {
            events: [
              {type: "textBox", text: "Vá para a biblioteca-nyan~~", faceMainch: "npc3" },
              {type: "textBox", text: "A mesma está ali à direita-nyan~~" },

            ]
          } 
        ]
      }),
    },

    walls: {

      //bushes

      //bottom
      [utils.asGridCoord(0, 10)]: true,
      [utils.asGridCoord(1, 10)]: true,
      [utils.asGridCoord(2, 10)]: true,
      [utils.asGridCoord(3, 10)]: true,
      [utils.asGridCoord(4, 10)]: true,
      [utils.asGridCoord(5, 10)]: true,
      [utils.asGridCoord(6, 10)]: true,
      [utils.asGridCoord(7, 10)]: true,
      [utils.asGridCoord(8, 10)]: true,
      [utils.asGridCoord(10, 10)]: true,
      [utils.asGridCoord(11, 10)]: true,
      [utils.asGridCoord(12, 10)]: true,
      [utils.asGridCoord(13, 10)]: true,
      [utils.asGridCoord(14, 10)]: true,
      [utils.asGridCoord(15, 10)]: true,
      [utils.asGridCoord(16, 10)]: true,
      [utils.asGridCoord(17, 10)]: true,
      //top
      [utils.asGridCoord(0, 7)]: true,
      [utils.asGridCoord(1, 7)]: true,
      [utils.asGridCoord(2, 7)]: true,
      [utils.asGridCoord(3, 6)]: true,
      [utils.asGridCoord(4, 7)]: true,
      [utils.asGridCoord(5, 7)]: true,
      [utils.asGridCoord(6, 7)]: true,
      [utils.asGridCoord(7, 7)]: true,
      [utils.asGridCoord(8, 7)]: true,
      [utils.asGridCoord(9, 7)]: true,
      [utils.asGridCoord(10, 7)]: true,
      [utils.asGridCoord(11, 7)]: true,
      [utils.asGridCoord(13, 7)]: true,
      [utils.asGridCoord(14, 7)]: true,
      [utils.asGridCoord(15, 7)]: true,
      [utils.asGridCoord(16, 7)]: true,
      [utils.asGridCoord(17, 7)]: true,

      //OVRWRLD
      [utils.asGridCoord(-1, 11)]: true,
      [utils.asGridCoord(-1, 12)]: true,
      [utils.asGridCoord(-1, 13)]: true,
      [utils.asGridCoord(-1, 14)]: true,
      [utils.asGridCoord(-1, 15)]: true,
      [utils.asGridCoord(-1, 16)]: true,
      [utils.asGridCoord(-1, 17)]: true,

      [utils.asGridCoord(0, 18)]: true,
      [utils.asGridCoord(1, 18)]: true,
      [utils.asGridCoord(2, 18)]: true,
      [utils.asGridCoord(3, 18)]: true,
      [utils.asGridCoord(4, 18)]: true,
      [utils.asGridCoord(5, 18)]: true,
      [utils.asGridCoord(6, 18)]: true,
      [utils.asGridCoord(7, 18)]: true,
      [utils.asGridCoord(8, 18)]: true,
      [utils.asGridCoord(9, 18)]: true,
      [utils.asGridCoord(10, 18)]: true,
      [utils.asGridCoord(11, 18)]: true,
      [utils.asGridCoord(12, 18)]: true,
      [utils.asGridCoord(13, 18)]: true,
      [utils.asGridCoord(14, 18)]: true,
      [utils.asGridCoord(15, 18)]: true,
      [utils.asGridCoord(16, 18)]: true,
      [utils.asGridCoord(17, 18)]: true,

      [utils.asGridCoord(18, 11)]: true,
      [utils.asGridCoord(18, 12)]: true,
      [utils.asGridCoord(18, 13)]: true,
      [utils.asGridCoord(18, 14)]: true,
      [utils.asGridCoord(18, 15)]: true,
      [utils.asGridCoord(18, 16)]: true,
      [utils.asGridCoord(18, 17)]: true,

      //HOUSES
      [utils.asGridCoord(13, 12)]: true,
      [utils.asGridCoord(14, 12)]: true,
      [utils.asGridCoord(15, 12)]: true,

      [utils.asGridCoord(13, 13)]: true,
      [utils.asGridCoord(14, 13)]: true,
      [utils.asGridCoord(15, 13)]: true,

      [utils.asGridCoord(13, 14)]: true,
      [utils.asGridCoord(14, 14)]: true,
      [utils.asGridCoord(15, 14)]: true,

      [utils.asGridCoord(13, 15)]: true,
      [utils.asGridCoord(14, 15)]: true,
      [utils.asGridCoord(15, 15)]: true,

      //2
      [utils.asGridCoord(2, 12)]: true,
      [utils.asGridCoord(3, 12)]: true,
      [utils.asGridCoord(4, 12)]: true,

      [utils.asGridCoord(2, 13)]: true,
      [utils.asGridCoord(3, 13)]: true,
      [utils.asGridCoord(4, 13)]: true,

      [utils.asGridCoord(2, 14)]: true,
      [utils.asGridCoord(3, 14)]: true,
      [utils.asGridCoord(4, 14)]: true,

      [utils.asGridCoord(2, 15)]: true,
      [utils.asGridCoord(3, 15)]: true,
      [utils.asGridCoord(4, 15)]: true,
      


    },

    eventSpace: {
      [utils.asGridCoord(12, 6)]: [
        {
          events: [
            { type: "changeMap", map: "LibraryIns" },
          ]
        }
      ]
    }
  },//end village1

  LibraryIns: {
    lowerSrc: "\PyVentures\assets\images\maps\LibraryInsLo.png",
    upperSrc: "\PyVentures\assets\images\maps\LibraryInsUp.png",

    gameObjects: {
      mainch: new Characters({
        isUserInput: true,
        x: utils.withGrid(5),
        y: utils.withGrid(12),
      }),

      npc1: new Characters({
        x: utils.withGrid(13),
        y: utils.withGrid(6),
        src: "\PyVentures\assets\images\characters\ch\npc1.png",
        behaveLoop: [
          {type: "stand", direction: "down", time: 600},
          {type: "stand", direction: "up", time: 1600},
          {type: "stand", direction: "right", time: 1600},
          {type: "stand", direction: "left", time: 1600},
        ],
        talking: [
          {
           events: [
              { type: "textBox", text: "Olá, quer aprender Python?", faceMainch: "npc1" },
              { type: "textBox", text: "Primeiramente me tire uma dúvida", faceMainch: "npc1" },
              { type: "multiquestionButtons"},
              { type: "textBox", text: "Parece que você sabe alguma coisa", faceMainch: "npc1" },
              { type: "textBox", text: "Seguindo estes passos você conseguirá melhorar por conta própria, seu primeiro programa seria" },
              { type: "pyConsole", 
                text: `Variable = contains a value<br>
                       first_name = "yv"<br>
                       last_name = "yyyy"<br>
                       full_name = first_name +" "+ last_name<br>
                       print(type(name))<br>
                       print("Hello " + full_name)`},  
              {type:"addStoryFlag", flag: "demo_quiz"}    
            ]
          },
        ]
      }),

      npc2: new Characters({
        x: utils.withGrid(3),
        y: utils.withGrid(6),
        src: "\PyVentures\assets\images\characters\ch\npc2cut.png",
        //fix npc walk loop
        behaveLoop: [
          {type: "stand", direction: "down", time: 200},
          {type: "stand", direction: "up", time: 200},
          

        // >>> fix walking npc bug
          /*{ type: "walk", direction: "down" },//change sprite
          { type: "stand", direction: "up", time: 200 },//change sprite
          { type: "walk", direction: "right" },//change sprite
          { type: "walk", direction: "right" },//change sprite
          { type: "walk", direction: "up" },//change sprite
          { type: "walk", direction: "left" },//change sprite
          { type: "walk", direction: "left" },//change sprite*/
        ],
        talking: [
          
          {
            required: ["demo_quiz"],
            events: [
              { type: "textBox", text: "Parabens por passar no primeiro quiz!" },
              { type: "textBox", text: "Agora conseguiremos seguir para os próximos passos de seu ensino."},
              { type: "textBox", text: "Primeiramente interaja com os livros que se encontram em volta de nós. "}
            ]
          },

          {
            events: [
              { type: "textBox", text: "Não fale comigo ainda!!!" }
            ]
          },

         
        ]
      }),

      Book1: new Characters({
        x: utils.withGrid(3),
        y: utils.withGrid(3),
        src: "/images/characters/Books/Book1.png",
        talking: [
          {
            events: [
              { type: "textBox", text: "..." }
            ]
          },
        ]
      }),
      Book2:
        new Characters({
          x: utils.withGrid(12),
          y: utils.withGrid(3),
          src: "/images/characters/Books/Book2.png",
          talking: [
            {
              events: [
                { type: "textBox", text: "..." }
              ]
            },
          ]
        }),
    },//end game objects

    //events and walls
    walls: {
      //back
      [utils.asGridCoord(6, 3)]: true,
      [utils.asGridCoord(8, 3)]: true,
      [utils.asGridCoord(6, 4)]: true,
      [utils.asGridCoord(8, 4)]: true,

      //top
      [utils.asGridCoord(1, 3)]: true,
      [utils.asGridCoord(2, 3)]: true,
      [utils.asGridCoord(4, 3)]: true, //book
      [utils.asGridCoord(5, 3)]: true,
      [utils.asGridCoord(9, 3)]: true,
      [utils.asGridCoord(10, 3)]: true,
      [utils.asGridCoord(11, 3)]: true,
      [utils.asGridCoord(13, 3)]: true,//book
      [utils.asGridCoord(14, 3)]: true,
      [utils.asGridCoord(15, 3)]: true,
      [utils.asGridCoord(16, 3)]: true,

      //left side
      [utils.asGridCoord(0, 3)]: true,
      [utils.asGridCoord(0, 4)]: true,
      [utils.asGridCoord(0, 5)]: true,
      [utils.asGridCoord(0, 6)]: true,
      [utils.asGridCoord(0, 7)]: true,
      [utils.asGridCoord(0, 8)]: true,
      [utils.asGridCoord(0, 9)]: true,
      [utils.asGridCoord(0, 10)]: true,
      [utils.asGridCoord(0, 11)]: true,

      //right side
      [utils.asGridCoord(16, 3)]: true,
      [utils.asGridCoord(16, 4)]: true,
      [utils.asGridCoord(16, 5)]: true,
      [utils.asGridCoord(16, 6)]: true,
      [utils.asGridCoord(16, 7)]: true,
      [utils.asGridCoord(16, 8)]: true,
      [utils.asGridCoord(16, 9)]: true,
      [utils.asGridCoord(16, 10)]: true,
      [utils.asGridCoord(16, 11)]: true,

      //bottom side
      [utils.asGridCoord(1, 12)]: true,
      [utils.asGridCoord(2, 12)]: true,
      [utils.asGridCoord(3, 12)]: true,
      [utils.asGridCoord(4, 12)]: true,
      [utils.asGridCoord(7, 12)]: true,
      [utils.asGridCoord(8, 12)]: true,
      [utils.asGridCoord(9, 12)]: true,
      [utils.asGridCoord(10, 12)]: true,
      [utils.asGridCoord(11, 12)]: true,
      [utils.asGridCoord(12, 12)]: true,
      [utils.asGridCoord(13, 12)]: true,
      [utils.asGridCoord(14, 12)]: true,
      [utils.asGridCoord(15, 12)]: true,


      //front door
      [utils.asGridCoord(4, 13)]: true,
      [utils.asGridCoord(6, 13)]: true,
      [utils.asGridCoord(5, 14)]: true,
      [utils.asGridCoord(6, 12)]: true,

    },

    eventSpace: {
      [utils.asGridCoord(7, 3)]: [
        {
          events: [
            { type: "textBox", text: "Você ainda não pode acessar esta área!!!" },
            { who: "mainch", type: "walk", direction: "down" },
            { who: "mainch", type: "walk", direction: "down" },
          ]
        }
      ],

      [utils.asGridCoord(5, 13)]: [
        {
          events: [
            { type: "changeMap", map: "VillageMap" },
          ]
        }
      ]

    }

  },//end of library

}