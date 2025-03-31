import { Tile } from "./tile.js";
export class GameMap {
    constructor() {
        this.map = [];
        this.dimensions = 4;

        let currentRow = [];
        let currentTile = [];

        for (let i = 0; i < this.dimensions; i++) {
            currentRow = [];
            for (let j = 0; j < this.dimensions; j++) {
                currentTile = new Tile(i,j);
                window.gameEngine.addEntity(currentTile);
                currentRow.push(currentTile);
            }
            this.map.push(currentRow);
        }

        this.selectedTile1 = null;
        this.selectedTile2 = null;
    }

    update() {
        console.log(this.selectedTile1 + " " + this.selectedTile2);
        for (let row = 0; row < this.dimensions; row++) {
            for (let col = 0; col < this.dimensions; col++) {
                if (this.map[row][col].selected) {
                    let currentTile = this.map[row][col];
                    if (!this.selectedTile1) {
                        this.selectedTile1 = currentTile;
                    } else if (this.selectedTile1 && this.selectedTile1 != currentTile) {
                        this.selectedTile2 = currentTile;

                        this.selectedTile1.selected = false;
                        this.selectedTile2.selected = false;
                        
                        this.selectedTile1 = null;
                        this.selectedTile2 = null
                    }
                }
            }
        }
    }

    draw(ctx) {

    }
}