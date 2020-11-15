var Config = function (
    playerNames,
    gameLevel,
    gameMode,
    isSetButton,
    isWhereSetButton,
    isAutoSupplementButton
) {
    this.playerNames = playerNames || [];
    this.gameLevel = gameLevel || GAME_LEVEL_BEGINNER;
    this.gameMode = gameMode || GAME_MODE_COMPETITION;
    this.isSetButton = isSetButton || false;
    this.isWhereSetButton = isWhereSetButton || false;
    this.isAutoSupplementButton = isAutoSupplementButton || false;
};
