import * as Util from "../util.js"
import { Hitbox } from "./hitbox.js"
export class Tile {
    constructor (row, col) {
        Object.assign(this, { row, col });
        this.value = Util.randomInt(20);
        this.clicked = false;
        this.selected = false;

        this.totalWidth = 1024;
        this.totalHeight = 768;

        this.length = 80;
        this.spacing = 30;
        this.wBorder = (this.totalWidth - ((this.spacing + this.length) * 3 + this.length)) / 2;
        this.hBorder = (this.totalHeight - ((this.spacing + this.length) * 3 + this.length)) / 2;

        this.x = (this.length + this.spacing) * this.row + this.wBorder;
        this.y = (this.length + this.spacing) * this.col + this.hBorder;

        this.right = this.x + this.length;
        this.bottom = this.y + this.length;

        console.log(this.x + " " + this.right + " " + this.y + " " + this.bottom);

        this.hitbox = new Hitbox(this.x, this.y, this.length, this.length);
        this.gameEngine = window.gameEngine;
    }

    update() {
        if (this.gameEngine.keys) {
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
                    this.selected = true;
                    this.clicked = false;
                } 
            } 
        } 
    }

    add(tile) {
        
    }

    draw(ctx) {
        if (this.clicked) {
            ctx.fillStyle = "red";
        } 
        else if (this.selected) {
            ctx.fillStyle = "green";
        } else {
            ctx.fillStyle = "black"
        }
        ctx.fillRect(this.x, this.y, this.length, this.length);
    }
}