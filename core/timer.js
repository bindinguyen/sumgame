// This game shell was happily modified from Googler Seth Ladd's "Bad Aliens" game and his Google IO talk in 2011

export class Timer {
    constructor() {
        this.gameTime = 0;
        this.maxStep = 0.05;
        this.lastTimestamp = 0;

        this.timeRemain = 60;
    };

    tick() {
        const current = Date.now();
        const delta = (current - this.lastTimestamp) / 1000;
        this.lastTimestamp = current;

        const gameDelta = Math.min(delta, this.maxStep);
        this.gameTime += gameDelta;
        if (this.timeRemain > 0) {
            this.timeRemain -= gameDelta;
        }

        if (this.timeRemain < 0) {
            this.timeRemain = 0;
        }

        return gameDelta;
    };

    
};
