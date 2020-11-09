const Template = function () {
    this.gameArenaContainer = null;
    this.gameAreaDivElement = null;
    this.gameAreaHeaderElement = null;
    this.gameSettingsDivElement = null;
    this.gameLevelsElement = null;
    this.gameModesElement = null;
    this.isAutoSupplementCheckboxElement = null;
    this.isSetCheckboxElement = null;
    this.isWhereSetCheckboxElement = null;
    this.playerInputsContainer = null;
    this.playerNumberElement = null;

    this.gameAreaDivElement = document.getElementById(GAME_AREA_DIV_ID);
    this.gameAreaHeaderElement = document.getElementById(GAME_AREA_HEADER_ID);
    this.gameSettingsDivElement = document.getElementById(GAME_SETTINGS_DIV_ID);
    this.gameLevelsElement = document.getElementById(GAME_LEVELS_ID);
    this.gameModesElement = document.getElementById(GAME_MODES_ID);
    this.isAutoSupplementCheckboxElement = document.getElementById(
        IS_AUTO_SUPLEMENT_CHECKBOX_ID
    );

    this.isSetCheckboxElement = document.getElementById(IS_SET_CHECKBOX_ID);
    this.isWhereSetCheckboxElement = document.getElementById(
        IS_WHERE_SET_CHECKBOX_ID
    );

    this.playerInputsContainer = document.getElementById(PLAYER_INPUTS_ID);
    this.playerNumberElement = document.getElementById(PLAYER_NUMBER_ID);

    this.gameArenaContainer = document.getElementById(GAME_AREA_ID);

    this.changeAreas = function () {
        this.gameSettingsDivElement.classList.toggle("d-none");

        this.gameAreaDivElement.classList.toggle("d-none");
    };

    this.createHeaderButtons = function (isSetButton, isWhereSetButton, isAutoSupplementButton) {
        if (isSetButton) {
            const isSetButtonElement = document.createElement("button");

            isSetButtonElement.innerHTML = "Is Set?";
            isSetButtonElement.type = "button";
            isSetButtonElement.classList.add("btn");
            isSetButtonElement.classList.add("btn-secondary");
            isSetButtonElement.classList.add("mr-1");

            this.gameAreaHeaderElement.appendChild(isSetButtonElement);
        }

        if (isWhereSetButton) {
            const isWhereSetButtonElement = document.createElement("button");

            isWhereSetButtonElement.innerHTML = "Where is Set?";
            isWhereSetButtonElement.type = "button";
            isWhereSetButtonElement.classList.add("btn");
            isWhereSetButtonElement.classList.add("btn-secondary");
            isWhereSetButtonElement.classList.add("mr-1");

            this.gameAreaHeaderElement.appendChild(isWhereSetButtonElement);
        }

        if (isAutoSupplementButton) {
            const isAutoSupplementButtonElement = document.createElement("button");

            isAutoSupplementButtonElement.innerHTML = "Supplement";
            isAutoSupplementButtonElement.type = "button";
            isAutoSupplementButtonElement.classList.add("btn");
            isAutoSupplementButtonElement.classList.add("btn-secondary");
            isAutoSupplementButtonElement.classList.add("mr-1");

            this.gameAreaHeaderElement.appendChild(isAutoSupplementButtonElement);
        }
    };

    this.createGameArenaContainer = function () {
        this.gameArenaContainer = document.getElementById(GAME_AREA_ID);
    };
};