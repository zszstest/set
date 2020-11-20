var Deck = function (gameLevel) {
    this.cards = [];

    this.isEmpty = function () {
        return !!this.cards.length;
    };

    this.getDeckSize = function () {
        return this.cards.length;
    };

    this.handlingOut = function (cardNumber) {
        return this.cards.splice(0, cardNumber);
    };

    this.log = function () {
        console.log(this.cards);
    };

    this.init = function () {
        this.cards = this.createCards();
        this.cards = this.shuffling(this.cards);

        this.log();
    };

    this.shuffling = function (cards) {
        var randomizedCards = [],
            n = cards.length,
            i;

        while (n) {
            i = Math.floor(Math.random() * cards.length);

            if (i in cards) {
                randomizedCards.push(cards[i]);

                delete cards[i];

                n--;
            }
        }

        return randomizedCards;
    };

    this.createCards = function () {
        var cards = [];

        if (gameLevel === "beginner") {
            CARD_NUMBERS.forEach((number) =>
                CARD_COLORS.forEach((color) =>
                    CARD_SHAPES.forEach((shape) =>
                        cards.push(
                            new Card(number, CARD_CONTENTS[0], color, shape)
                        )
                    )
                )
            );
        } else {
            CARD_NUMBERS.forEach((number) =>
                CARD_CONTENTS.forEach((content) =>
                    CARD_COLORS.forEach((color) =>
                        CARD_SHAPES.forEach((shape) =>
                            cards.push(new Card(number, content, color, shape))
                        )
                    )
                )
            );
        }

        return cards;
    };

    this.init();
};
