class Card {
    fruitType = null
    cardHtml = null
    flipped = false

    constructor(fruitType) {
        this.fruitType = fruitType
    }

    renderCard() {
        let card = document.createElement("div");
        card.classList.add("card");

        card.innerHTML = `<div class="card-inner ${this.fruitType}">
            <div class="card-front"></div>
            <div class="card-back">
                <img src="../images/${this.fruitType}.jpg" alt="">
            </div>
        </div>`;

        this.cardHtml = card

        return card;
    }
}

export default Card;
