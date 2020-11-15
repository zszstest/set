const GameEngine = function () {
    this.deck = null;
    this.cardsOnBoard = null;
    this.checkButtonElement = null;

    let selectedCards = [];

    this.init = () => {
        template.createGameArenaContainer();
        template.createGamePlayersContainer();
    };

    this.startGame = (config) => {
        createCheckButtonElement();

        template.createHeaderButtons(
            config.isSetButton,
            config.isWhereSetButton,
            config.isAutoSupplementButton
        );

        createGamePlayers(config.playerNames);

        this.deck = new Deck(config.gameLevel, 3);

        this.cardsOnBoard = this.deck.handlingOut(12);

        this.cardsOnBoard.forEach((card) => {
            const spanElement = document.createElement("span");

            spanElement.classList.add("card-container");

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

            spanElement.appendChild(img);

            template.gameArenaContainer.appendChild(spanElement);
        });

        const sets = findSets(generate3Cards(Array.from(this.cardsOnBoard)));

        console.log(sets);
    };

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

    const createCheckButtonElement = () => {
        this.checkButtonElement = document.createElement("button");

        this.checkButtonElement.innerHTML = "Check";
        this.checkButtonElement.classList.add("btn");
        this.checkButtonElement.classList.add("btn-primary");
        this.checkButtonElement.classList.add("mr-1");

        this.checkButtonElement.addEventListener("click", (event) => {
            console.log("Check selected cards");
        });

        template.gameAreaHeaderElement.appendChild(this.checkButtonElement);
    };

    const createGamePlayers = (playerNames) => {
        const players = playerNames.map(playerName => new Player(playerName));

        players.forEach(player => {
            const playerContainer = document.createElement("div");

            playerContainer.classList.add("row");
            playerContainer.classList.add("player");

            playerContainer.innerHTML = 
                "<div class='col-sm-4'>" + player.name + "</div>" +
                "<div class='col-sm-2'>" + player.tryings + "</div>" +
                "<div class='col-sm-2'>" + player.corrects + "</div>" +
                "<div class='col-sm-2'>" + player.fails + "</div>" +
                "<div class='col-sm-2'>" + player.points + "</div>";

            template.gamePlayersContainer.appendChild(playerContainer);
        });
    };

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

    this.init();
};
