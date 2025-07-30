import Card from "./card.js"
import { fruitTypes, Shuffle, updateMove, updateScore, flipCard, unFlippedCard } from "./util.js";
class Board {
    timeOutID = null;
    score = 0;
    moves = 0;
    maxmoves = 10;
    selectedCards = [];
    cards = []
    cardtype = [fruitTypes[0], fruitTypes[1], fruitTypes[2], fruitTypes[3], fruitTypes[4], fruitTypes[5], fruitTypes[0], fruitTypes[1], fruitTypes[2], fruitTypes[3], fruitTypes[4], fruitTypes[5]]
    container = document.querySelector(".container");

    constructor() {
        this.cards = [];
        this.selectedCards = [];
        this.score = 0;
        this.moves = 0;
        updateMove(this.moves);
        updateScore(this.score, this.moves);
    }

    renderCardContainer() {
        this.container.innerHTML = " ";
        this.cards = [];
        const shuffledCards = Shuffle([...this.cardtype]);
        shuffledCards.forEach((type) => {
            let card = new Card(type)
            let cardElement = card.renderCard();
            cardElement.addEventListener("click", () => {
                this.handleCardClick(card);
            })
            this.cards.push(cardElement);
            this.container.appendChild(cardElement);
        })

    }

    handleCardClick(card) {
        if (this.selectedCards.length >= 2 || card.flipped) {
            return;
        }

        flipCard(card);
        this.selectedCards.push(card);

        if (this.selectedCards.length === 1) {
        this.timeOutID = setTimeout(() => {
            unFlippedCard(card);
            this.selectedCards = [];
        }, 2000);
    }

        if (this.selectedCards.length === 2) {
            clearTimeout(this.timeOutID);
            this.disableAllCards();
            this.moves++;
            updateMove(this.moves);
            this.checkMatch();
        }
    }

    checkMatch() {
        let [card1, card2] = this.selectedCards;
        let type1 = card1.fruitType;
        let type2 = card2.fruitType;

        if (type1 === type2) {
            this.score++;
            updateScore(this.score, this.moves);
            setTimeout(() => {
                this.selectedCards = [];
                this.enableAllCards();
                if (this.score === this.cards.length / 2) {
                    alert("You Win!");
                }
            }, 500);
        } else {
            setTimeout(() => {
                unFlippedCard(card1);
                unFlippedCard(card2);
                this.selectedCards = [];
                this.enableAllCards();
            }, 1000);
        }

        if (this.moves >= this.maxmoves && this.score < this.cards.length / 2) {
            setTimeout(() => {
                alert("You Lose! Out of Moves.");
                this.disableAllCards();
            }, 1000);
        }
    }

    disableAllCards() {
        this.cards.forEach((card) => {
            card.style.pointerEvents = "none"
        })
    }

    enableAllCards() {
        this.cards.forEach((card) => {
            card.style.pointerEvents = ""
        })
    }
    
}
export default Board;