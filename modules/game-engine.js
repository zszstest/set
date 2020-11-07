const GameEngine = function () {
    let gameArenaContainer =
    
    this.init = function () {
        gameArenaContainer = document.getElementById(GAME_AREA_ID);
    };

    this.startGame = function (config) {
        var deck = new Deck(config.gameLevel, 3);
    
        deck.log();
    
        let cardsOnBoard = deck.handlingOut(12);
    
        cardsOnBoard.forEach((card) => {
            var img = document.createElement("img");
    
            img.setAttribute("width", 120);
            img.setAttribute("src", "images/" + card.imageUrl);
    
            gameArenaContainer.appendChild(img);
        });
    };
    
    this.init();
};