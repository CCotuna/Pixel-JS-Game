export const LEFT = "LEFT";
export const RIGHT = "RIGHT";
export const UP = "UP";
export const DOWN = "DOWN";

export class Input {
    constructor(game) {
        this.game = game;
        this.keys = [];

        window.addEventListener('keydown', e => {
            this.keyPressed(e.key);
        });
        window.addEventListener('keyup', e => {
            this.keyReleased(e.key);
        });
    }
    keyPressed(key) {
        if (this.keys.indexOf(key) === -1) {
            this.keys.unshift(key);
        }
    }
    keyReleased(key) {
        const index = this.keys.indexOf(key);
        if (index === -1) return;
        this.keys.splice(index, 1);
    }
    getKey(action, controls) {
        switch (action) {
            case UP:
                return controls.up;
            case DOWN:
                return controls.down;
            case LEFT:
                return controls.left;
            case RIGHT:
                return controls.right;
            default:
                return null;
        }
    }
    isKeyPressed(action, controls) {
        const key = this.getKey(action, controls);
        return this.keys.includes(key);
    }
}
