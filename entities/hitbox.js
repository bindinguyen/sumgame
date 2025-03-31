export class Hitbox {
    constructor (x, y, width, height) {
        Object.assign(this, { x, y, width, height });

        this.left = x;
        this.top = y;
        this.right = this.left + this.width;
        this.bottom = this.top + this.height;
    }

    isClickedOn(x, y) {          
        return this.right > x && this.left < x && this.top < y && this.bottom > y;
    }
}