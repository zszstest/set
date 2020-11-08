const Settings = function () {
    let gameLevelsElement = null;
    let gameModesElement = null;
    let isAutoSupplementCheckboxElement = null;
    let isSetCheckboxElement = null;
    let isWhereSetCheckboxElement = null;
    let playerInputsContainer = null;
    let playerNumberElement = null;

    this.maintainPlayerNameInputs = function (
        playerNumber,
        playerInputsContainer
    ) {
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
        gameLevelsElement = document.getElementById(GAME_LEVELS_ID);
        gameModesElement = document.getElementById(GAME_MODES_ID);
        isAutoSupplementCheckboxElement = document.getElementById(
            IS_AUTO_SUPLEMENT_CHECKBOX_ID
        );

        isSetCheckboxElement = document.getElementById(IS_SET_CHECKBOX_ID);
        isWhereSetCheckboxElement = document.getElementById(
            IS_WHERE_SET_CHECKBOX_ID
        );

        playerInputsContainer = document.getElementById(PLAYER_INPUTS_ID);
        playerNumberElement = document.getElementById(PLAYER_NUMBER_ID);

        playerNumberElement.setAttribute(
            "value",
            defaultSettings.defaultPlayerNumber
        );

        playerNumberElement.addEventListener("change", (event) => {
            this.maintainPlayerNameInputs(event.target.value, playerInputsContainer);
        });

        gameModesElement.addEventListener("change", function (event) {
            if (event.target.value === "competition") {
                isAutoSupplementCheckboxElement.setAttribute(
                    "checked",
                    "checked"
                );
                isAutoSupplementCheckboxElement.setAttribute(
                    "disabled",
                    "disabled"
                );

                isSetCheckboxElement.setAttribute("checked", "checked");
                isSetCheckboxElement.setAttribute("disabled", "disabled");
                isWhereSetCheckboxElement.setAttribute("checked", "checked");
                isWhereSetCheckboxElement.setAttribute("disabled", "disabled");
            } else {
                isAutoSupplementCheckboxElement.removeAttribute("checked");
                isAutoSupplementCheckboxElement.removeAttribute("disabled");
                isSetCheckboxElement.removeAttribute("checked");
                isSetCheckboxElement.removeAttribute("disabled");
                isWhereSetCheckboxElement.removeAttribute("checked");
                isWhereSetCheckboxElement.removeAttribute("disabled");
            }
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
