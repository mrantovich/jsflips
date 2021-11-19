const cardsCollection = document.querySelectorAll('.card__inner');
const winButton = document.querySelector('.win__button');

winButton.addEventListener('click', function() {
    cardsCollection.forEach(function(item) {
        item.classList.remove('_activated');
        item.classList.remove('_showed');
    });
    let overlay = document.querySelector('.win');
    overlay.classList.remove('_is-win');
    shuffleCards();
    placeCardPairs();
});


function placeCardPairs() {
    let imgArray = ['apple', 'apple', 'banana', 'banana', 'kiwi', 'kiwi', 'mushroom', 'mushroom', 'olive', 'olive', 'egg', 'egg'];
    // Place pairs of cards with correspondence classes.
    for (let i = 0; i < cardsCollection.length; i++) {
        let card = cardsCollection[i];

        let randomItem = imgArray[getRandomInt(0, imgArray.length - 1)];
        let randomItemIndex = imgArray.indexOf(randomItem);
        imgArray.splice(randomItemIndex, 1);

        card.classList.add(randomItem);

        card.addEventListener('click', makeCardActivated);
    };
}


function makeCardActivated(e) {
    e.currentTarget.classList.toggle('_activated');
    compareCards(e.currentTarget);
    if (document.querySelectorAll('._showed').length === 12) {
        setTimeout(function() {
            let overlay = document.querySelector('.win');
            overlay.classList.add('_is-win');
        }, 500);
    };
};

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
};

let lastCards = [];

function compareCards(currentCard) {
    let cards = document.querySelectorAll('.card__inner');
    let currentCardItemClass = currentCard.classList[1];
    lastCards.push(currentCard);

    for (let i = 0; i < cards.length; i++) {
        let card = cards[i];
        if (card !== currentCard) {
            if (card.classList.contains('_activated') && card.classList.contains(currentCardItemClass)) {
                card.classList.add('_showed');
                currentCard.classList.add('_showed');
                lastCards = [];
            };
        };
    };

    if (lastCards) {
        if (lastCards.length === 2) {
            let card = lastCards[0];
            let curcard = lastCards[1];
            setTimeout(() => card.classList.remove('_activated'), 1500);
            setTimeout(() => curcard.classList.remove('_activated'), 1500);
            lastCards = [];
        };
    };

};

function shuffleCards() {
    let imgArray = ['apple', 'apple', 'banana', 'banana', 'kiwi', 'kiwi', 'mushroom', 'mushroom', 'olive', 'olive', 'egg', 'egg'];
    cardsCollection.forEach(function(item) {
        imgArray.forEach(function(iitem) {
            if (item.classList.contains(iitem)) {
                item.classList.remove(iitem);
            }
        });
    });
};

placeCardPairs();
