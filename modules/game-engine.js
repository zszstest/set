const GameEngine = function () {
    this.deck = null;
    this.checkButtonElement = null;

    let cardsOnBoard = null;
    let selectedCards = [];
    let selectedCardElementMap = new Map();
    let currentSets = [];
    let selectedPlayerContainer = null;

    /**
     * Initializes game engine.
     */
    this.init = () => {
        template.createGameAreaContainer();
        template.createGamePlayersContainer();
    };

    /**
     * Starts game.
     *
     * @param {*} config
     *
     * @returns void
     */
    this.startGame = (config) => {
        createCheckButtonElement();

        template.createHeaderButtons(
            config.isSetButton,
            config.isWhereSetButton,
            config.isAutoSupplementButton
        );

        createGamePlayers(config.playerNames);

        this.deck = new Deck(config.gameLevel, 3);

        cardsOnBoard = this.deck.handlingOut(12);

        maintainGameAreaContainer();
    };

    /**
     *
     * @param {*} values
     */
    const areEqualOrDifferent = (values) => {
        return (
            (values[0] === values[1] &&
                values[0] === values[2] &&
                values[1] === values[2]) ||
            (values[0] !== values[1] &&
                values[0] !== values[2] &&
                values[1] !== values[2])
        );
    };

    /**
     *
     * @param {*} cards
     */
    const checkSetOnCards = (cards) => {
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

    /**
     * Decides that the selected cards by the selected player is set or not.
     *
     * @returns boolean
     */
    const checkSelectedCardsForSet = () => {
        return currentSets.reduce((isSet, currentCards) => {
            if (
                currentCards.includes(selectedCards[0]) &&
                currentCards.includes(selectedCards[1]) &&
                currentCards.includes(selectedCards[2])
            ) {
                isSet = true;
            }

            return isSet;
        }, false);
    };

    /**
     * Create a check button element with click event handler.
     */
    const createCheckButtonElement = () => {
        this.checkButtonElement = document.createElement("button");

        this.checkButtonElement.innerHTML = "Check";
        this.checkButtonElement.setAttribute("disabled", "disabled");
        this.checkButtonElement.classList.add("btn");
        this.checkButtonElement.classList.add("btn-primary");
        this.checkButtonElement.classList.add("mr-1");

        this.checkButtonElement.addEventListener("click", (event) => {
            const isSet = checkSelectedCardsForSet();

            maintainPlayer(selectedPlayerContainer, isSet);

            if (isSet) {
                selectedCards.forEach((card) => {
                    cardsOnBoard = cardsOnBoard.filter(
                        (cardOnBoard) => cardOnBoard !== card
                    );
                });

                console.log(cardsOnBoard);

                cardsOnBoard = [...cardsOnBoard, ...this.deck.handlingOut(3)];

                maintainGameAreaContainer();
            }

            reset(isSet);
        });

        template.gameAreaHeaderElement.appendChild(this.checkButtonElement);
    };

    /**
     * Creates game players and player elements based on the given player names from settings.
     *
     * @param {*} playerNames
     * @returns void
     */
    const createGamePlayers = (playerNames) => {
        const players = playerNames.map((playerName) => new Player(playerName));
        const playerElements = [];

        players.forEach((player) => {
            const playerContainer = document.createElement("div");

            playerContainer.classList.add("row");
            playerContainer.classList.add("player");
            playerContainer.setAttribute("data-player", JSON.stringify(player));

            playerContainer.addEventListener("click", (event) => {
                selectedPlayerContainer = playerContainer;

                playerElements.forEach((playerElement) => {
                    playerElement.classList.remove("selected");
                });

                playerContainer.classList.add("selected");
            });

            playerContainer.innerHTML =
                "<div class='col-sm-4 name'>" +
                player.name +
                "</div>" +
                "<div class='col-sm-2 attempts'>" +
                player.attempts +
                "</div>" +
                "<div class='col-sm-2 corrects'>" +
                player.corrects +
                "</div>" +
                "<div class='col-sm-2 fails'>" +
                player.fails +
                "</div>" +
                "<div class='col-sm-2 points'>" +
                player.points +
                "</div>";

            playerElements.push(playerContainer);

            template.gamePlayersContainer.appendChild(playerContainer);
        });
    };

    /**
     * Fints sets in a card map.
     * Returns the all found card sets.
     *
     * @param {*} cardsMap
     */
    const findSets = (cardsMap) => {
        const cardSets = [];

        Array.from(cardsMap.values()).forEach((cards) => {
            console.log(cards);

            if (checkSetOnCards(cards)) {
                cardSets.push(cards);
            }
        });

        return cardSets;
    };

    /**
     * Makes 3 cards array in the all variations.
     *
     * @param {*} cards
     */
    const generate3Cards = (cards) => {
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

    /**
     *
     * @param {*} playerContainer
     */
    const maintainPlayer = (playerContainer, isSet) => {
        const player = JSON.parse(playerContainer.getAttribute("data-player"));

        player.attempts = player.attempts + 1;

        if (isSet) {
            player.corrects = player.corrects + 1;
            player.points = player.points + 1;
        } else {
            player.fails = player.fails + 1;
        }

        playerContainer.querySelector(".attempts").innerHTML = player.attempts;
        playerContainer.querySelector(".corrects").innerHTML = player.corrects;
        playerContainer.querySelector(".fails").innerHTML = player.fails;
        playerContainer.querySelector(".points").innerHTML = player.points;

        playerContainer.setAttribute("data-player", JSON.stringify(player));
    };

    /**
     * Update game area when the application is initialized and every cases when players find a set.
     */
    const maintainGameAreaContainer = () => {
        template.gameAreaContainer.innerHTML = "";

        cardsOnBoard.forEach((card) => {
            const cardElement = document.createElement("span");

            cardElement.classList.add("card-container");

            var img = document.createElement("img");

            img.addEventListener("click", (event) => {
                if (selectedCards.length < 3 && !!selectedPlayerContainer) {
                    if (selectedCards.includes(card)) {
                        selectedCards = selectedCards.filter((selectedCard) => {
                            return selectedCard.name !== card.name;
                        });

                        img.classList.toggle("selected");

                        selectedCardElementMap.delete(card);
                    } else {
                        selectedCards.push(card);

                        img.classList.toggle("selected");

                        selectedCardElementMap.set(card, cardElement);
                    }
                }

                if (selectedCards.length === 3) {
                    this.checkButtonElement.removeAttribute("disabled");
                }

                console.log("Selected Cards: ", selectedCards);
            });

            img.setAttribute("width", 120);
            img.setAttribute("src", "images/" + card.imageUrl);
            img.setAttribute("data-card", JSON.stringify(card));

            cardElement.appendChild(img);

            template.gameAreaContainer.appendChild(cardElement);

            currentSets = findSets(generate3Cards(Array.from(cardsOnBoard)));
        });
    };

    /**
     *
     */
    const reset = (isSet) => {
        selectedPlayerContainer.classList.remove("selected");
        selectedPlayerContainer = null;

        this.checkButtonElement.setAttribute("disabled", "disabled");

        selectedCards = [];

        Array.from(selectedCardElementMap.values()).forEach((cardElement) => {
            cardElement.querySelector("img").classList.remove("selected");
        });

        selectedCardElementMap.clear();
    };

    this.init();
};
