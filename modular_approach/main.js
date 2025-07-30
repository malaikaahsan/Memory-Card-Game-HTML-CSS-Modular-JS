import Game from './game.js';
let game = new Game();
game.start();

document.getElementById("restart").addEventListener("click", () => {
    game.start(); 
});