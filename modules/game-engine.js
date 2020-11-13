const GameEngine = function () {
    this.deck = null;
    this.cardsOnBoard = null;

    let selectedCards = [];

    this.init = function () {
        template.createGameArenaContainer();
    };

    this.startGame = function (config) {
        template.createHeaderButtons(
            config.isSetButton,
            config.isWhereSetButton,
            config.isAutoSupplementButton
        );

        this.deck = new Deck(config.gameLevel, 3);

        this.deck.log();

        this.cardsOnBoard = this.deck.handlingOut(12);

        this.cardsOnBoard.forEach((card) => {
            var img = document.createElement("img");

            img.addEventListener("click", (event) => {
                if (selectedCards.length < 3) {
                    if (selectedCards.includes(card)) {
                        selectedCards = selectedCards.filter(selectedCard => {
                            return selectedCard.name !== card.name;
                        });
                        
                        img.classList.toggle("selected");
                    } else {
                        selectedCards.push(card);

                        img.classList.toggle("selected");
                    }
                }

                console.log("Selected Cards: ", selectedCards);
            });

            img.setAttribute("width", 120);
            img.setAttribute("src", "images/" + card.imageUrl);
            img.setAttribute("data-card", card);

            template.gameArenaContainer.appendChild(img);
        });

        const sets = findSets(generate3Cards(Array.from(this.cardsOnBoard)));

        console.log(sets);
    };

    const findSets = function (cardsMap) {
        const cardSets = [];

        Array.from(cardsMap.values()).forEach((cards) => {
            console.log(cards);
            if (checkSetOnCards(cards)) {
                cardSets.push(cards);
            }
        });

        return cardSets;
    };

    const checkSetOnCards = function (cards) {
        if (
            areEqualOrDifferent([
                cards[0].number,
                cards[1].number,
                cards[2].number,
            ]) &&
            areEqualOrDifferent([
                cards[0].content,
                cards[1].content,
                cards[2].content,
            ]) &&
            areEqualOrDifferent([
                cards[0].color,
                cards[1].color,
                cards[2].color,
            ]) &&
            areEqualOrDifferent([
                cards[0].shape,
                cards[1].shape,
                cards[2].shape,
            ])
        ) {
            return true;
        } else {
            return false;
        }
    };

    const areEqualOrDifferent = function (values) {
        return (
            (values[0] === values[1] &&
                values[0] === values[2] &&
                values[1] === values[2]) ||
            (values[0] !== values[1] &&
                values[0] !== values[2] &&
                values[1] !== values[2])
        );
    };

    const generate3Cards = function (cards) {
        const threeCards = new Map();

        cards.forEach((card1) =>
            cards.forEach((card2) =>
                cards.forEach((card3) => {
                    if (
                        card1.name !== card2.name &&
                        card1.name !== card3.name &&
                        card2.name !== card3.name
                    ) {
                        const selectedCards = [card1, card2, card3];
                        const sortedSelectedCards = selectedCards.sort(
                            (c1, c2) => (c1.name < c2.name ? 1 : -1)
                        );
                        const name = sortedSelectedCards
                            .map((c) => c.name)
                            .join("-");

                        threeCards.set(name, selectedCards);
                    }
                })
            )
        );

        console.log(threeCards);

        return threeCards;
    };

    this.init();
};
