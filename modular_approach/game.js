import Board from "./board.js"

class Game {
    container = null;
    start() {
        this.container = new Board();
        this.container.renderCardContainer();
    }

}

export default Game;