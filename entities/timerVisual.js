export class timerVisual {
    constructor() {
        this.height = 30

        this.progress = 0;
        this.maxTime = 60;
    }

    update() {
        
    }

    draw(ctx) {
        let progress = window.gameEngine.timer.timeRemain / this.maxTime;

        // cycle from green --> yellow 
        if (progress <= 1 && progress >= 0.5) {
            ctx.fillStyle = `rgb(${255 * -(progress - 0.5) * 2 + 255}, 255, 0)`;
        }
        // cycle from yellow --> red
        else if (progress < 0.5 && progress >= 0) {
            console.log(255 * (progress / 0.5))
            ctx.fillStyle = `rgb(255, ${255 * (progress / 0.5)}, 0)`;
        }

        ctx.fillRect(window.innerWidth / 8, window.innerHeight / 2 + 100, (window.innerWidth / 7) * progress, this.height);
    }
}