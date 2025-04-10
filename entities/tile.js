import * as Util from "../util.js"
import { Hitbox } from "./hitbox.js"
export class Tile {
    constructor (arrX, arrY) {
        Object.assign(this, { arrX, arrY });
        this.value = Util.randomInt(20);
        this.clicked = false;
        this.selected = false;
        this.rotten = false;

        this.length = 80;
        this.spacing = 30;

        this.resize();

        this.gameEngine = window.gameEngine;
    }

    update() {
        if (this.gameEngine.keys && this.value < 100) {
            if (this.gameEngine.keys["m1"]) {
                // clicked on
                if (this.hitbox.isClickedOn(this.gameEngine.mouse.x, this.gameEngine.mouse.y)) {
                    this.clicked = true;
                } else {
                    this.clicked = false;
                }
            }

            if (!this.gameEngine.keys["m1"] && this.clicked) {
                // clicked and released in square
                if (this.hitbox.isClickedOn(this.gameEngine.mouse.x, this.gameEngine.mouse.y)) {
                    this.selected = !this.selected;
                    this.clicked = false;
                } 
            } 
        } 
    }

    add(tile) {
        this.value += tile.value;

        this.selected = false;
        tile.selected = false;
    }

    isAdj(tile) {
        let sameX = tile.arrX === this.arrX;
        let sameY = tile.arrY === this.arrY;
        let sameRow = Math.abs(this.arrX - tile.arrX) === 1;
        let sameCol = Math.abs(this.arrY - tile.arrY) === 1;

        return (sameX && sameCol) || (sameY && sameRow);
    }

    resize() {
        this.totalWidth = window.innerWidth;
        this.totalHeight = window.innerHeight;

        this.wBorder = (this.totalWidth - ((this.spacing + this.length) * 3 + this.length)) / 2;
        this.hBorder = (this.totalHeight - ((this.spacing + this.length) * 3 + this.length)) / 2;

        this.x = (this.length + this.spacing) * this.arrX + this.wBorder;
        this.y = (this.length + this.spacing) * this.arrY + this.hBorder;
        
        this.hitbox = new Hitbox(this.x, this.y, this.length, this.length);
    }

    draw(ctx) {
        // coloring for tile bkgrd
        if (this.clicked) {
            ctx.fillStyle = "red";
        } 
        else if (this.selected) {
            ctx.fillStyle = "green";
        } else {
            ctx.fillStyle = "black";
        }
        ctx.fillRect(this.x, this.y, this.length, this.length);

        // coloring for text
        if (this.rotten) {
            ctx.fillStyle = "yellow";
        } else {
            ctx.fillStyle = "white";
        }
        
        ctx.font = "30px serif";
        ctx.fillText(this.value, this.x + this.length / 2, this.y + this.length / 2);
    }
}