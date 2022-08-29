$("#b").addEventListener("click", () => {
    window.location.reload();
});

let flippedCards = [];
let isGameStalled = false;

let back = `img/back.png`;
let clear = `img/clear.png`;

// Card Class
class Card {
    constructor(value, index, elem, suite) {
        this.flipped = false;
        this.cardIndex = index;
        this.value = value;
        this.htmlElem = elem;
        this.suite = suite;

        this.isCleared = false;

        this.htmlElem.addEventListener("click", () => {
            if(isGameStalled || this.isCleared || this.flipped) return;
            this.toggleFlip();
            if(flippedCards.length == 2) {
                // They are matching so hide!
                let card1 = flippedCards[0];
                let card2 = flippedCards[1];
                if(card1.value == card2.value) {
                    isGameStalled = true;
                    setTimeout(() => {
                        card1.makeClear();
                        card2.makeClear();
                        flippedCards = [];
                        isGameStalled = false;
                    }, 1500);
                }
                else {
                    isGameStalled = true;
                    setTimeout(() => {
                        card1.toggleFlip();
                        card2.toggleFlip();
                        flippedCards = [];
                        isGameStalled = false;
                    }, 1500);
                }
            }
        });
    }

    toggleFlip() {
        if(this.flipped == false) {
            this.htmlElem.src = `img/${this.value}${this.suite}.png`;
            this.flipped = true;
            flippedCards.push(this);
        }
        else {
            this.flipped = false;
            this.htmlElem.src = back;
            flippedCards.splice(flippedCards.indexOf(this), 1);
        }
    }

    makeClear() {
        this.htmlElem.src = clear;
        this.isCleared = true;
    }
}

// Setup the game board
let assignArr = [{in: 1, suite: "hearts"}, {in: 2, suite: "hearts"}, {in: 3, suite: "hearts"}, {in: 1, suite: "clubs"}, {in: 2, suite: "clubs"}, {in: 3, suite: "clubs"}];
let assignArrL = assignArr.length;
let cardArr = [];
for (let i = 0; i < assignArrL; i++) {
    let randomIndex = Math.floor(Math.random() * assignArr.length);
    let randomVal = assignArr[randomIndex].in;
    let randomSuiteVal = assignArr[randomIndex].suite;
    let thisCard = $(`#card${i + 1}`);
    thisCard.setAttribute('draggable', false);
    cardArr.push(new Card(randomVal, i, thisCard, randomSuiteVal));
    assignArr.splice(randomIndex, 1); // Remove the element from the array
}