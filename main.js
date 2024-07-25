import { World } from "./scripts/world.js";
import { Hero } from "./scripts/hero.js";
import { Enemy } from "./scripts/enemy.js";
import { Input } from "./scripts/input.js";
export const TILE_SIZE = 32;
export const COLS = 15;
export const ROWS = 20;
const GAME_WIDTH = COLS * TILE_SIZE;
const GAME_HEIGHT = ROWS * TILE_SIZE;

export const HALF_TILE = TILE_SIZE / 2;

window.addEventListener('load', function() {
    const canvas = document.getElementById('canvas1');
    const ctx = canvas.getContext('2d')
    canvas.width = GAME_WIDTH;
    canvas.height = GAME_HEIGHT;

    class Game {
        constructor() {
            this.world = new World()
            this.hero = new Hero({
                game: this,
                sprite: {image: document.getElementById('hero1'), x:0, y:11, width: 64, height: 64 }, 
                position: {x: 1 * TILE_SIZE, y: 2 *TILE_SIZE},
                scale: 1
            });

            this.enemy = new Enemy({
                game: this,
                sprite: {image: document.getElementById('enemy1'), x:0, y:11, width: 64, height: 64 }, 
                position: {x: 3 * TILE_SIZE, y: 5 *TILE_SIZE},
                scale: 1
            });
            this.input = new Input(this)

            this.eventUpdate = false;
            this.eventTimer = 0;
            this.eventInterval = 80;

            this.debug = false;
        }
        toggleDebug(){
            this.debug = !this.debug;
        }
        render(ctx, deltaTime) {
            this.hero.update(deltaTime); 

            this.world.drawBackground(ctx)
            if (this.debug) this.world.drawGrid(ctx);
            this.hero.draw(ctx)
            this.world.drawForeground(ctx)
            if (this.debug) this.world.drawCollisionMap(ctx);

            if(this.eventTimer < this.eventInterval) {
                this.eventTimer += deltaTime;
                this.eventUpdate = false;
            } else {
                this.eventTimer = this.eventInterval % this.eventTimer;
                this.eventUpdate = true;
            }
        }
    }

    const game = new Game();

    let lastTime = 0
    function animate(timeStamp) {
        requestAnimationFrame(animate);

        const deltaTime = timeStamp - lastTime;
        lastTime = timeStamp;

        game.render(ctx, deltaTime);
    }
    requestAnimationFrame(animate)
    
})