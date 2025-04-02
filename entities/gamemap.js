import { Tile } from "./tile.js";
import * as Util from "../util.js";
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

        this.selectedTile1 = null;
        this.selectedTile2 = null;
        // after 20 seconds, the next egg will be rotten
        this.maxTime = 20;
    }

    update() {
        if(window.gameEngine.timer) {
            console.log(window.gameEngine.timer.last100);
        }
        for (let arrX = 0; arrX < this.dimensions; arrX++) {
            for (let arrY = 0; arrY < this.dimensions; arrY++) {
                let currentTile = this.map[arrX][arrY];
                if (currentTile.selected) {
                    if (!this.selectedTile1) {
                        this.selectedTile1 = currentTile;
                    } else if (this.selectedTile1 && this.selectedTile1 != currentTile) {
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
            this.selectedTile2.isAdj(this.selectedTile1);
            // add tile 1 to tile 2
            this.selectedTile2.add(this.selectedTile1);

            if (this.selectedTile2.value == 100) {
                if (window.gameEngine.timer.last100 > this.maxTime) {
                    this.selectedTile2.rotten = true;
                    console.log("uh oh rotten");
                }

                window.gameEngine.timer.last100 = 0;
            }

            // handle tiles "falling"
            for (let i = this.selectedTile1.arrY; i > 0; i--) {
                this.map[this.selectedTile1.arrX][i].value = this.map[this.selectedTile1.arrX][i - 1].value
            }

            this.map[this.selectedTile1.arrX][0].value = Util.randomInt(20);

            this.selectedTile1 = null;
            this.selectedTile2 = null;
        }
    }

    resize() {
       for (let i = 0; i < this.dimensions; i++) {
            for (let j = 0; j < this.dimensions; j++) {
                this.map[i][j].resize();
            }
       }
    }

    draw(ctx) {

    }
}