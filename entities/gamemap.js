import { Tile } from "./tile.js";
import * as Util from "../util.js";
import { timerVisual } from "./timerVisual.js";
export class GameMap {
    constructor() {
        this.map = [];
        this.dimensions = 4;

        let currentRow = [];
        let currentTile = [];

        for (let arrX = 0; arrX < this.dimensions; arrX++) {
            currentRow = [];
            for (let arrY = 0; arrY < this.dimensions; arrY++) {
                currentTile = new Tile(arrX,arrY);
                window.gameEngine.addEntity(currentTile);
                currentRow.push(currentTile);
            }
            this.map.push(currentRow);
        }

        window.gameEngine.addEntity(new timerVisual());

        this.selectedTile1 = null;
        this.selectedTile2 = null;
        // after 60 seconds, the next egg will be rotten
        this.maxTime = 60;
        this.score = 0;
        this.highscore = 0;
    }

    update() {
        for (let arrX = 0; arrX < this.dimensions; arrX++) {
            for (let arrY = 0; arrY < this.dimensions; arrY++) {
                let currentTile = this.map[arrX][arrY];
                if (currentTile.selected) {
                    if (!this.selectedTile1) {
                        this.selectedTile1 = currentTile;
                    } else if (this.selectedTile1 && this.selectedTile1 != currentTile) {
                        // if an adj tile was selected
                        if (this.selectedTile1.isAdj(currentTile)) {
                            this.selectedTile2 = currentTile;
                        } else {
                            currentTile.selected = false;
                        }
                    }
                    // tile was unselected
                } else if (!currentTile.selected && this.selectedTile1 === currentTile) {
                    this.selectedTile1 = null;
                }
            }
        }

        
        // if theres 2 tiles selected
        if (this.selectedTile1 && this.selectedTile2) {
            if (this.selectedTile1.value + this.selectedTile2.value <= 100) {
                // add tile 1 to tile 2
                this.handleScore();
                this.selectedTile2.add(this.selectedTile1);

                if (this.selectedTile2.value == 100) {
                    if (window.gameEngine.timer.timeRemain < 0) {
                        this.selectedTile2.rotten = true;
                        console.log("uh oh rotten");
                    }
                    window.gameEngine.timer.timeRemain = this.maxTime;
                }

                this.applyGravity();

                this.selectedTile1 = null;
                this.selectedTile2 = null;
            } else {
                this.selectedTile2.selected = false;
                this.selectedTile2 = null;
            }

            if (!this.checkLost()) {
                console.log("game still go");
            }
            
        }
    }

    handleScore() {
        this.addedScore = 0;

        // if egg is rotten, addedScore = 250
        // if egg is perfectly new, addedScore = 2500

        if (this.selectedTile1.value + this.selectedTile2.value === 100) {
            let multiplier = 1 + (window.gameEngine.timer.timeRemain * 3 / 20);
            this.addedScore += Math.ceil(multiplier * 250);
        } else {
            this.addedScore += this.selectedTile1.value;
            this.addedScore += this.selectedTile2.value;
        }

        this.score += this.addedScore;
    }

    applyGravity() {
        // handle tiles "falling"
                for (let i = this.selectedTile1.arrY; i > 0; i--) {
                    this.map[this.selectedTile1.arrX][i].value = this.map[this.selectedTile1.arrX][i - 1].value
                }

                this.map[this.selectedTile1.arrX][0].value = Util.randomInt(20);
    }

    checkLost() {
        // cycle through and check all adj tiles for if it can be added
        for (let arrX = 0; arrX  < this.dimensions; arrX++) {
            for (let arrY = 0; arrY  < this.dimensions; arrY++) {

                // greatest possible value the neighboring tile can be
                let greatestVal = 100 - this.map[arrX][arrY].value;

                if (arrY > 0 && this.map[arrX][arrY - 1].value <= greatestVal) {
                    return false;
                } 

                if (arrY < this.dimensions - 1 && this.map[arrX][arrY + 1].value <= greatestVal) {
                    return false;
                }
                
                if (arrX > 0 && this.map[arrX - 1][arrY].value <= greatestVal) {
                    return false;
                }

                if (arrX < this.dimensions - 1 && this.map[arrX + 1][arrY].value <= greatestVal) {
                    return false;
                }
            }
        }

        console.log("game lost");
        return true;
    }

    resize() {
       for (let i = 0; i < this.dimensions; i++) {
            for (let j = 0; j < this.dimensions; j++) {
                this.map[i][j].resize();
            }
       }


    }

    startRuntime() {
        this.startTime = performance.now();
    }

    endRuntime() {
        let elapsedTime = performance.now() - this.startTime;
        console.log(`function ran in ${elapsedTime} ms`);
    }

    draw(ctx) {
        ctx.fillStyle = "black";
        ctx.font = "30px serif";
        ctx.fillText(this.score, window.innerWidth / 5, window.innerHeight / 2);
    }
}