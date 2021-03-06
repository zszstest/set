const GameEngine = function () {
    this.deck = null;
    this.checkButtonElement = null;

    let cardsOnBoard = null;
    let selectedCards = [];
    let currentSets = [];
    let selectedPlayerContainer = null;
    let players = null;
    let playersMap = new Map();
    let currentCheckInterval = null;
    let timeForCheck = null;
    let gameMode = null;
    let gameLevel = null;
    let isAutoSupplementButton = false;
    let isSingleMode = false;

    /**
     * Initializes game engine.
     */
    this.init = () => {
        template.createGameAreaContainer();
        template.createGamePlayersContainer();

        registerKeyUpEvent();
    };

    /**
     * Starts game.
     *
     * @param {*} config
     *
     * @returns void
     */
    this.startGame = (config) => {
        gameMode = config.gameMode;
        gameLevel = config.gameLevel;
        timeForCheck = config.timeForCheck;
        isAutoSupplementButton = config.isAutoSupplementButton;
        isSingleMode = config.playerNames.length === 1;

        createCheckButtonElement();

        createHeaderButtons(
            config.isSetButton,
            config.isWhereSetButton,
            config.isAutoSupplementButton
        );

        createGamePlayers(
            config.playerNames,
            template.gamePlayersContainer,
            isSingleMode
        );

        if (isSingleMode) {
            selectPlayer(0);
        }

        this.deck = new Deck(config.gameLevel);

        cardsOnBoard = this.deck.handlingOut(12);

        maintainGameAreaContainer();

        storage.startGame(this.getNow(), players, gameMode, gameLevel);
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
            clearCheckInterval();

            const isSet = checkSelectedCardsForSet();

            handleCheckAction(isSet);
        });

        template.gameAreaHeaderElement.appendChild(this.checkButtonElement);
    };

    const handleCheckAction = (isSet) => {
        maintainPlayer(selectedPlayerContainer, isSet);

        if (isSet) {
            selectedCards.forEach((card) => {
                cardsOnBoard = cardsOnBoard.filter(
                    (cardOnBoard) => cardOnBoard !== card
                );
            });

            console.log(cardsOnBoard);

            cardsOnBoard = [...cardsOnBoard, ...this.deck.handlingOut(3)];
        }

        storage.addHistoryItem(
            this.getNow(),
            JSON.parse(selectedPlayerContainer.getAttribute("data-player")),
            selectedCards,
            isSet
        );

        reset(isSingleMode);

        maintainGameAreaContainer();

        if (currentSets.length === 0 && this.deck.getDeckSize() === 0) {
            this.finishGame();
        } else if (currentSets.length === 0 && isAutoSupplementButton) {
            template.isAutoSupplementButtonElement.removeAttribute("disabled");
        }
    };

    const clearCheckInterval = () => {
        clearInterval(currentCheckInterval);

        template.countdownElement.innerHTML = "";
    };

    /**
     * Creates game players and player elements based on the given player names from settings.
     *
     * @param {*} playerNames
     * @returns void
     */
    const createGamePlayers = (playerNames, container, isSingleMode) => {
        players = playerNames.map((playerName) => new Player(playerName));

        players.forEach((player) => playersMap.set(player.name, player));

        createGamePlayerList(players, container, true, isSingleMode);
    };

    const createGamePlayerList = (
        players,
        container,
        isAction,
        isSingleMode
    ) => {
        const playerElements = [];

        players.forEach((player) => {
            const playerContainer = document.createElement("div");

            playerContainer.classList.add("row");
            playerContainer.classList.add("player");
            playerContainer.setAttribute("data-player", JSON.stringify(player));

            if (isAction && !isSingleMode) {
                playerContainer.addEventListener("click", (event) => {
                    clearCheckInterval();

                    selectedPlayerContainer = playerContainer;

                    playerElements.forEach((playerElement) => {
                        playerElement.classList.remove("selected");
                    });

                    playerContainer.classList.add("selected");

                    currentCheckInterval = setCheckingCountdown(
                        1000,
                        timeForCheck
                    );
                });
            }

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

            container.appendChild(playerContainer);
        });
    };

    /**
     * Create header buttons with event handlers.
     *
     * @param {*} isSetButton
     * @param {*} isWhereSetButton
     * @param {*} isAutoSupplementButton
     */
    const createHeaderButtons = (
        isSetButton,
        isWhereSetButton,
        isAutoSupplementButton
    ) => {
        // Creates elements in template.
        template.createHeaderButtons(
            isSetButton,
            isWhereSetButton,
            isAutoSupplementButton
        );

        if (isSetButton) {
            setClickEventOnIsSetButton();
        }

        if (isWhereSetButton) {
            setClickEventOnIsWhereButton();
        }

        if (isAutoSupplementButton) {
            template.isAutoSupplementButtonElement.setAttribute(
                "disabled",
                "disabled"
            );

            template.isAutoSupplementButtonElement.addEventListener(
                "click",
                (event) => {
                    cardsOnBoard = [
                        ...cardsOnBoard,
                        ...this.deck.handlingOut(3),
                    ];

                    maintainGameAreaContainer();
                }
            );
        }
    };

    this.finishGame = () => {
        storage.finishGame(this.getNow());

        template.gameAreaDivElement.classList.add("d-none");
        template.gameResultDivElement.classList.remove("d-none");

        const sortedPlayers = Array.from(playersMap.values()).sort((a, b) =>
            a.points < b.points ? 1 : -1
        );

        createGamePlayerList(
            sortedPlayers,
            template.gameResultDivElement,
            false
        );
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

        return threeCards;
    };

    this.getNow = () => {
        const date = new Date();

        return date.getTime();
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

        playersMap.set(player.name, player);
    };

    /**
     * Update game area when the application is initialized and every cases when players find a set.
     */
    const maintainGameAreaContainer = () => {
        currentSets = findSets(generate3Cards(Array.from(cardsOnBoard)));

        while (
            currentSets.length === 0 &&
            !isAutoSupplementButton &&
            this.deck.getDeckSize() > 0
        ) {
            cardsOnBoard = [...cardsOnBoard, ...this.deck.handlingOut(3)];
        }

        template.gameAreaContainer.innerHTML = "";
        template.cardNumberElement.innerHTML = this.deck.getDeckSize();

        cardsOnBoard.forEach((card) => {
            const cardElement = document.createElement("span");

            cardElement.classList.add("card-container");
            cardElement.setAttribute("data-card", JSON.stringify(card));

            var img = document.createElement("img");

            img.addEventListener("click", (event) => {
                if (selectedCards.length < 3 && !!selectedPlayerContainer) {
                    if (selectedCards.includes(card)) {
                        selectedCards = selectedCards.filter((selectedCard) => {
                            return selectedCard.name !== card.name;
                        });

                        img.classList.toggle("selected");
                    } else {
                        selectedCards.push(card);

                        img.classList.toggle("selected");
                    }
                }

                if (selectedCards.length === 3) {
                    this.checkButtonElement.removeAttribute("disabled");
                }

                console.log("Selected Cards: ", selectedCards);
            });

            img.setAttribute("width", 110);
            img.setAttribute("src", "images/" + card.imageUrl);
            img.setAttribute("data-card", JSON.stringify(card));

            cardElement.appendChild(img);

            template.gameAreaContainer.appendChild(cardElement);
        });
    };

    const registerKeyUpEvent = () => {
        document.addEventListener("keyup", (event) => {
            if (event.altKey) {
                const index = event.code.replace("Numpad", "");

                Array.from(template.gamePlayersContainer.children).forEach(
                    (playerElement) => {
                        playerElement.classList.remove("selected");
                    }
                );

                selectPlayer(index);
            }
        });
    };

    const selectPlayer = (index) => {
        selectedPlayerContainer = template.gamePlayersContainer.children[index];

        selectedPlayerContainer.classList.add("selected");
    };

    /**
     *
     */
    const reset = (isSingleMode) => {
        if (!isSingleMode) {
            selectedPlayerContainer.classList.remove("selected");
            selectedPlayerContainer = null;
        }

        this.checkButtonElement.setAttribute("disabled", "disabled");

        selectedCards = [];
    };

    /**
     * Add event listener to isSetButtonElement that will display number
     * of current sets and remove message after a timeout.
     */
    const setClickEventOnIsSetButton = () => {
        template.isSetButtonElement.addEventListener("click", (event) => {
            const currentSetsNumber = currentSets.length;
            let isSetContainer = document.createElement("div");

            isSetContainer.classList.add("isSet");
            isSetContainer.innerHTML =
                currentSetsNumber > 0
                    ? `Thera are ${currentSetsNumber} sets on the board.`
                    : `There is not set on the board.`;

            template.gameAreaHeaderElement.appendChild(isSetContainer);

            setTimeout(() => {
                template.gameAreaHeaderElement.removeChild(
                    template.gameAreaHeaderElement.lastChild
                );
            }, 6000);
        });
    };

    /**
     * Add event listener to isWhereSetButtonElement that will select the first
     * set of the currentSets and remove selection after a timeout.
     */
    const setClickEventOnIsWhereButton = () => {
        template.isWhereSetButtonElement.addEventListener("click", (event) => {
            if (currentSets.length === 0) {
                let isSetWhereContainer = document.createElement("div");

                isSetWhereContainer.classList.add("is-where-set");
                isSetWhereContainer.innerHTML = `There is not set on the board.`;

                template.gameAreaHeaderElement.appendChild(isSetWhereContainer);

                setTimeout(() => {
                    template.gameAreaHeaderElement.removeChild(
                        template.gameAreaHeaderElement.lastChild
                    );
                }, 6000);
            } else {
                const currentSelectedSetCardElements = [];

                currentSets[0].forEach((setCard) => {
                    const setCardElement = Array.from(
                        template.gameAreaContainer.children
                    ).find((cardElement) => {
                        const card = JSON.parse(
                            cardElement.getAttribute("data-card")
                        );

                        return card.name === setCard.name;
                    });

                    setCardElement
                        .querySelector("img")
                        .classList.toggle("selected");

                    currentSelectedSetCardElements.push(setCardElement);
                });

                setTimeout(() => {
                    currentSelectedSetCardElements.forEach((setCardElement) =>
                        setCardElement
                            .querySelector("img")
                            .classList.toggle("selected")
                    );
                }, 3000);
            }
        });
    };

    const setCheckingCountdown = (time, fromValue) => {
        return setInterval(() => {
            template.countdownElement.innerHTML = --fromValue;

            if (fromValue === -1) {
                clearCheckInterval();

                handleCheckAction(false);
            }
        }, time);
    };

    this.init();
};
