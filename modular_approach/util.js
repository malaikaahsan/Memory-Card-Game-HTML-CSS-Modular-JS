export const fruitTypes = ["apple", "mango", "banana", "orange", "peach", "strawberry"];


export function Shuffle(cards) {
    for (let i = cards.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [cards[i], cards[j]] = [cards[j], cards[i]]

    }
    return cards;
}

export function flipCard(card){
    // console.log(card.cardHtml.classList);
    card.cardHtml.classList.add('flipped');
    card.flipped = true
}

export function unFlippedCard(card) {
    card.cardHtml.classList.remove('flipped');
    card.flipped = false
}

export function updateMove(moves) {
    let moveSpan = document.getElementById("moves");
    moveSpan.innerText = moves;
}
export function updateScore(score,moves) {
    let Score = document.getElementById("score");
    Score.innerHTML = `score: ${score} | moves: <span id='moves'>${moves}</span>`;
}