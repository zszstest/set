var History = function (startTime, players, gameMode, gameLevel) {
    this.startTime = startTime;
    this.players = players;
    this.gameMode = gameMode;
    this.gameLevel = gameLevel;
    this.endTime = null;
    this.items = [];
};

var HistoryItem = function (actionTime, player, action, result) {
    this.actionTime = actionTime;
    this.player = player;
    this.action = action;
    this.result = result;
};