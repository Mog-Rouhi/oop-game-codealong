class Game {
    constructor(){
        this.player = null; //will store an instance of the class Player
        this.obstacles = []; //will store instances of the class Obstacle       
    }

    start(){
        this.player = new Player();
        this.attachEventListeners();
        
        //create new obstacle
        setInterval(() => {
            const newObstacle = new Obstacle();
            this.obstacles.push(newObstacle);
        }, 4000);

        //move obstacles
        setInterval(() => {
            this.obstacles.forEach((obstacleInstance) => {
                obstacleInstance.moveDown();
                if (
                    this.player.positionX < obstacleInstance.positionX + obstacleInstance.width &&
                    this.player.positionX  + this.player.width > obstacleInstance.positionX &&
                    this.player.positionY  < obstacleInstance.positionY + obstacleInstance.height &&
                    this.player.height + this.player.positionY > obstacleInstance.positionY
                  ){
                    location.href = 'gameover.html';
                    console.log("game over")
                  }
            });
        }, 60);
    }

    attachEventListeners(){
        document.addEventListener("keydown", (event) => {
            if(event.key === "ArrowLeft"){
                this.player.moveLeft();
            }else if(event.key === "ArrowRight"){
                this.player.moveRight();
            }else if(event.key === "ArrowUp"){
                this.player.moveUp();
            }else if(event.key === "ArrowDown"){
                this.player.moveDown();
            }
        });
    }
}


class Player {
    constructor(){
        this.positionX = 50;
        this.positionY = 0;
        this.width = 10;
        this.height = 10;
        this.domElement = null;

        this.createDomElement();
    }

    createDomElement(){
        // create dom element
        this.domElement = document.createElement('div');

        // set id and css
        this.domElement.id = "player";
        this.domElement.style.width = this.width + "vw";
        this.domElement.style.height = this.height + "vh";
        this.domElement.style.bottom = this.positionY + "vh";
        this.domElement.style.left = this.positionX + "vw";
        
        // append to the dom
        const boardElm = document.getElementById("board");
        boardElm.appendChild(this.domElement);

    }

    moveLeft(){
        if (this.positionX < 1){
            this.positionX = 1;
        } else {
            this.positionX--;
            this.domElement.style.left = this.positionX + "vw";
        }      
    } 

    moveRight(){
        if (this.positionX > 89){
            this.positionX = 89;
        } else {
            this.positionX++;
            this.domElement.style.left = this.positionX + "vw";
        }
    }

    moveUp(){
        if (this.positionY > 90){
            this.domElement.style.bottom = 90 + "vh";
        } else {
            this.positionY++;
            this.domElement.style.bottom = this.positionY + "vh";
        }
    }

    moveDown(){
        if (this.positionY < 0){
            this.domElement.style.bottom = 0 + "vh";
        } else {
            this.positionY--;
            this.domElement.style.bottom = this.positionY + "vh";
        }
    }
}


class Obstacle {
    constructor(){
        this.positionX = Math.random() * 100;
        this.positionY = 90;
        this.width = 10;
        this.height = 10;
        this.domElement = null;

        this.createDomElement();
    }

    createDomElement(){
        // create dom element
        this.domElement = document.createElement('div');

        // set id and css
        this.domElement.className = "obstacle";
        this.domElement.style.width = this.width + "vw";
        this.domElement.style.height = this.height + "vh";
        this.domElement.style.bottom = this.positionY + "vh";
        this.domElement.style.left = this.positionX + "vw";

        // append to the dom
        const boardElm = document.getElementById("board");
        boardElm.appendChild(this.domElement)
    }

    moveDown(){
        this.positionY--;
        this.domElement.style.bottom = this.positionY + "vh";

        if (this.positionY === 0) {
            this.domElement.remove();
          }
          this.domElement.style.bottom = this.positionY + 'vh';
        }

    remove() {
          this.domElement.remove();      
        }
}

const game = new Game();
game.start();

