const Settings = function () {
    let playerNumberElement = null;
    let playerInputsContainer = null;
    let gameLevelsContainer = null;

    this.maintainPlayerNameInputs = function (playerNumber, playerInputsContainer) {
        var playerInputs = playerInputsContainer.getElementsByTagName("input");

        if (playerInputs.length > playerNumber) {
            while (playerInputs.length > playerNumber) {
                playerInputsContainer.removeChild(
                    playerInputsContainer.childNodes[playerInputs.length]
                );
            }
        } else if (playerInputs.length < playerNumber) {
            while (playerInputs.length < playerNumber) {
                var x = document.createElement("INPUT");

                x.setAttribute("type", "text");
                x.setAttribute("value", "Player" + (playerInputs.length + 1));

                playerInputsContainer.appendChild(x);
            }
        }
    };

    this.init = function () {
        playerNumberElement = document.getElementById("playerNumber");
        playerInputsContainer = document.getElementById(PLAYER_INPUTS_ID);
        gameLevelsContainer = document.getElementById(GAME_LEVELS_ID);

        playerNumberElement.setAttribute(
            "value",
            defaultSettings.defaultPlayerNumber
        );

        playerNumberElement.addEventListener("change", function (event) {
            maintainPlayerNameInputs(event.target.value, playerInputsContainer);
        });
    };

    this.createConfig = function () {
        const config = new Config();

        config.gameLevel = this.getGameLevel();

        return config;
    };

    this.getGameLevel = function () {
        return document.querySelector("input[name=gameLevel]:checked").value;
    };

    this.init();
};
