const Settings = function () {
    this.maintainPlayerNameInputs = function (
        playerNumber,
        playerInputsContainer
    ) {
        var playerInputs = template.playerInputsContainer.getElementsByTagName(
            "input"
        );

        if (playerInputs.length > playerNumber) {
            while (playerInputs.length > playerNumber) {
                template.playerInputsContainer.removeChild(
                    template.playerInputsContainer.childNodes[
                        playerInputs.length
                    ]
                );
            }
        } else if (playerInputs.length < playerNumber) {
            while (playerInputs.length < playerNumber) {
                var x = document.createElement("INPUT");

                x.setAttribute("type", "text");
                x.setAttribute("value", "Player" + (playerInputs.length + 1));

                template.playerInputsContainer.appendChild(x);
            }
        }
    };

    this.init = function () {
        template.playerNumberElement.setAttribute(
            "value",
            defaultSettings.defaultPlayerNumber
        );

        template.playerNumberElement.addEventListener("change", (event) => {
            this.maintainPlayerNameInputs(
                event.target.value,
                template.playerInputsContainer
            );
        });

        template.gameModesElement.addEventListener("change", function (event) {
            if (event.target.value === "competition") {
                template.isAutoSupplementCheckboxElement.checked = false;
                
                template.isSetCheckboxElement.checked = false;

                template.isWhereSetCheckboxElement.checked = false;
            } else {
                template.isAutoSupplementCheckboxElement.removeAttribute("disabled");

                template.isSetCheckboxElement.removeAttribute("disabled");

                template.isWhereSetCheckboxElement.removeAttribute("disabled");
            }
        });
    };

    this.createConfig = function () {
        return new Config(
            this.getPlayers(),
            this.getGameLevel(),
            this.getGameMode(),
            this.isSetButton(),
            this.isWhereSetButton(),
            this.isAutoSupplementButton()
        );
    };

    this.getGameLevel = function () {
        return document.querySelector("input[name=gameLevel]:checked").value;
    };

    this.getGameMode = function () {
        return document.querySelector("input[name=gameMode]:checked").value;
    };

    this.isAutoSupplementButton = function () {
        return !!document.querySelector("input[name=isAutoSupplementCheckbox]:checked");
    };

    this.isSetButton = function () {
        return !!document.querySelector("input[name=isSetCheckbox]:checked");
    };

    this.isWhereSetButton = function () {
        return !!document.querySelector("input[name=isWhereSetCheckbox]:checked");
    };

    this.getPlayers = function () {
        var playerInputs = template.playerInputsContainer.getElementsByTagName(
            "input"
        );

        return Array.from(playerInputs).map(
            (playerInput) => playerInput.value
        );
    };

    this.init();
};
