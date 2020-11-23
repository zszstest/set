const Template = function () {
    this.countdownElement = null;
    this.gameAreaContainer = null;
    this.gameAreaDivElement = null;
    this.gameAreaHeaderElement = null;
    this.gameSettingsDivElement = null;
    this.gameLevelsElement = null;
    this.gameModesElement = null;
    this.gamePlayersContainer = null;
    this.gameResultDivElement = null;
    this.isAutoSupplementCheckboxElement = null;
    this.isSetCheckboxElement = null;
    this.isWhereSetCheckboxElement = null;
    this.playerInputsContainer = null;
    this.playerNumberElement = null;
    this.cardNumberElement = null;

    this.isSetButtonElement = null;
    this.isWhereSetButtonElement = null;

    this.cardNumberElement = document.getElementById(CARD_NUMBER_ID);
    this.countdownElement = document.getElementById(COUNTDOWN_ID);
    this.gameAreaDivElement = document.getElementById(GAME_AREA_DIV_ID);
    this.gameAreaHeaderElement = document.getElementById(GAME_AREA_HEADER_ID);
    this.gameSettingsDivElement = document.getElementById(GAME_SETTINGS_DIV_ID);
    this.gameLevelsElement = document.getElementById(GAME_LEVELS_ID);
    this.gameModesElement = document.getElementById(GAME_MODES_ID);
    this.gameResultDivElement = document.getElementById(GAME_RESULT_DIV_ID);
    this.isAutoSupplementCheckboxElement = document.getElementById(
        IS_AUTO_SUPLEMENT_CHECKBOX_ID
    );

    this.isSetCheckboxElement = document.getElementById(IS_SET_CHECKBOX_ID);
    this.isWhereSetCheckboxElement = document.getElementById(
        IS_WHERE_SET_CHECKBOX_ID
    );

    this.playerInputsContainer = document.getElementById(PLAYER_INPUTS_ID);
    this.playerNumberElement = document.getElementById(PLAYER_NUMBER_ID);

    this.gameAreaContainer = document.getElementById(GAME_AREA_ID);

    this.changeAreas = function () {
        this.gameSettingsDivElement.classList.toggle("d-none");

        this.gameAreaDivElement.classList.toggle("d-none");
    };

    this.createHeaderButtons = function (isSetButton, isWhereSetButton, isAutoSupplementButton) {
        if (isSetButton) {
            this.isSetButtonElement = document.createElement("button");

            this.isSetButtonElement.innerHTML = "Is Set?";
            this.isSetButtonElement.type = "button";
            this.isSetButtonElement.classList.add("btn");
            this.isSetButtonElement.classList.add("btn-secondary");
            this.isSetButtonElement.classList.add("mr-1");

            this.gameAreaHeaderElement.appendChild(this.isSetButtonElement);
        }

        if (isWhereSetButton) {
            this.isWhereSetButtonElement = document.createElement("button");

            this.isWhereSetButtonElement.innerHTML = "Where is Set?";
            this.isWhereSetButtonElement.type = "button";
            this.isWhereSetButtonElement.classList.add("btn");
            this.isWhereSetButtonElement.classList.add("btn-secondary");
            this.isWhereSetButtonElement.classList.add("mr-1");

            this.gameAreaHeaderElement.appendChild(this.isWhereSetButtonElement);
        }

        if (isAutoSupplementButton) {
            this.isAutoSupplementButtonElement = document.createElement("button");

            this.isAutoSupplementButtonElement.innerHTML = "Supplement";
            this.isAutoSupplementButtonElement.type = "button";
            this.isAutoSupplementButtonElement.classList.add("btn");
            this.isAutoSupplementButtonElement.classList.add("btn-secondary");
            this.isAutoSupplementButtonElement.classList.add("mr-1");

            this.gameAreaHeaderElement.appendChild(this.isAutoSupplementButtonElement);
        }
    };

    this.createGameAreaContainer = function () {
        this.gameAreaContainer = document.getElementById(GAME_AREA_ID);
    };

    this.createGamePlayersContainer = function () {
        this.gamePlayersContainer = document.getElementById(GAME_PLAYERS_ID);
    };
};