import Card from '/card.js'


console.log(Card.personalVariable)

class memorygame {
    score = 0;
    container = [];
    cards = [];
    selectedcard = [];
    moves = 0;
    maxmoves = 10;
    cardClass = new Card.Card()
    constructor(cards, container) {
        this.originalHTML = container.innerHTML;
        this.cards = cards;
        this.container = container;
        this.startgame()
        cards.forEach((card) => {
            card.addEventListener('click', () => {
                this.checkformatch(card);
            })
        })

        // window.alert('helo')
        console.log(this.cardClass.rendercard())

    }
    startgame() {
        for (let i = this.cards.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]]

        }
        this.container.innerHTML = " ";
        this.cards.forEach((card) => {
            this.container.appendChild(card)
        })
    }

    checkformatch(card) {
        if (this.selectedcard.length > 1 || card.classList.contains("flipped")) {
            return;
        }

        card.classList.add("flipped");
        this.selectedcard.push(card);
        
        if (this.selectedcard.length === 2) {
            this.disableallcards();
            this.moves++;
            document.getElementById("moves").innerText = this.moves;
            let type1 = this.selectedcard[0].querySelector(".card-inner").classList[1];
            let type2 = this.selectedcard[1].querySelector(".card-inner").classList[1];
            if (type1 === type2) {
                this.score++;
                document.getElementById("score").innerHTML = "score: " + this.score + " | moves: <span id='moves'>" + this.moves + "</span>";
                setTimeout(() => {
                    this.selectedcard = [];
                    this.cards.forEach(card => card.style.pointerEvents = "");
                    if (this.score === this.cards.length / 2) {
                        setTimeout(() => {
                            alert('Wins game');
                        }, 500);
                    }
                }, 500);
            } else {
                setTimeout(() => {
                    this.selectedcard[0].classList.remove("flipped");
                    this.selectedcard[1].classList.remove("flipped");
                    this.selectedcard = [];
                    this.cards.forEach(card => card.style.pointerEvents = "");
                }, 1000);
            }
            if (this.moves >= this.maxmoves && this.score < this.cards.length / 2) {
                setTimeout(() => {
                    alert('you lose the game | out of moves');
                    this.disableallcards();
                }, 1000);
            }
        }
    }
    disableallcards() {
        this.cards.forEach((card) => {
            card.style.pointerEvents = "none";
        })
    }
    restartgame() {
        this.container.innerHTML = this.originalHTML;
        this.cards = Array.from(document.getElementsByClassName("card"));
        this.selectedcard = [];
        this.moves = 0;
        this.score = 0;
        this.cards.forEach(card => card.classList.remove("flipped"));
        this.startgame();
        this.cards.forEach((card) => {
            card.replaceWith(card.cloneNode(true));
        });
        this.cards = Array.from(document.getElementsByClassName("card"));
        this.cards.forEach((card) => {
            card.addEventListener('click', () => {
                this.checkformatch(card);
            });
        });
        document.getElementById("score").innerHTML = "score: " + this.score + " | moves: <span id='moves'>" + this.moves + "</span>";
    }
}
let cards = Array.from(document.getElementsByClassName("card"));
let container = document.querySelector(".container");
let game = new memorygame(cards, container);