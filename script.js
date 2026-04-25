class memorygame {
    score = 0;
    container = [];
    cards = [];
    selectedcard = [];
    moves = 0;
    maxmoves = 10;
    
    constructor(cards, container) {
        this.cards = cards;
        this.container = container;
        
        
        this.startgame();
        
      
        this.cards.forEach((card) => {
            card.addEventListener('click', () => {
                this.checkformatch(card);
            });
        });
    }

    startgame() {
       
        for (let i = this.cards.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
        }
        
        this.container.innerHTML = ""; 
        this.cards.forEach((card) => {
            this.container.appendChild(card); 
        });
    }

    checkformatch(card) {
       
        if (this.selectedcard.length >= 2 || card.classList.contains("flipped")) {
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
                document.getElementById("score").innerHTML = `score: ${this.score} | Moves: <span id='moves'>${this.moves}</span>`;
                
                setTimeout(() => {
                    this.selectedcard = [];
                    this.cards.forEach(card => {
                        
                        if (!card.classList.contains("flipped")) {
                            card.style.pointerEvents = "";
                        }
                    });
                    
                    if (this.score === this.cards.length / 2) {
                        setTimeout(() => alert('You win the game!'), 300);
                    }
                }, 500);
                
            } else {
                
                setTimeout(() => {
                    this.selectedcard[0].classList.remove("flipped");
                    this.selectedcard[1].classList.remove("flipped");
                    this.selectedcard = [];
                    this.cards.forEach(card => {
                        if (!card.classList.contains("flipped")) {
                            card.style.pointerEvents = "";
                        }
                    });
                }, 1000);
            }
            
         
            if (this.moves >= this.maxmoves && this.score < this.cards.length / 2) {
                setTimeout(() => {
                    alert('You lose the game | Out of moves');
                    this.disableallcards();
                }, 1000);
            }
        }
    }

    disableallcards() {
        this.cards.forEach((card) => {
            card.style.pointerEvents = "none";
        });
    }

    restartgame() {
     
        this.selectedcard = [];
        this.moves = 0;
        this.score = 0;
        document.getElementById("score").innerHTML = `score: 0 | Moves: <span id='moves'>0</span>`;
        
     
        this.cards.forEach(card => {
            card.classList.remove("flipped");
            card.style.pointerEvents = "";
        });

        
        setTimeout(() => {
            this.startgame();
        }, 800);
    }
}


let cards = Array.from(document.getElementsByClassName("card"));
let container = document.querySelector(".container");
let game = new memorygame(cards, container);


document.getElementById("restart").addEventListener("click", () => {
    game.restartgame();
});