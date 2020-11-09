const GameEngine = function () {
    this.init = function () {
        template.createGameArenaContainer();
    };

    this.startGame = function (config) {
        template.createHeaderButtons(
            config.isSetButton,
            config.isWhereSetButton,
            config.isAutoSupplementButton
        );

        const deck = new Deck(config.gameLevel, 3);

        deck.log();

        let cardsOnBoard = deck.handlingOut(12);

        cardsOnBoard.forEach((card) => {
            var img = document.createElement("img");

            img.setAttribute("width", 120);
            img.setAttribute("src", "images/" + card.imageUrl);

            template.gameArenaContainer.appendChild(img);
        });
    };

    this.init();
};
