var Storage = function () {
    let history = null;

    this.addHistoryItem = (actionTime, player, action, result) => {
        const historyItem = new HistoryItem(actionTime, player, action, result);

        history.items.push(historyItem);
    };

    this.finishGame = (endTime) => {
        history.endTime = endTime;

        const histories = this.read(HISTORIES) || [];

        histories.push(history);

        this.save(HISTORIES, histories);
    };

    this.getHistory = () => {
        return history;
    };

    this.read = (name) => {
        const data = localStorage.getItem(name);

        return data ? JSON.parse(data) : null;
    };

    this.save = (name, data) => {
        localStorage.setItem(name, JSON.stringify(data));
    };

    this.startGame = (startTime, players, gameMode, gameLevel) => {
        history = new History(startTime, players, gameMode, gameLevel);

        console.log("Game started at ", new Date(startTime));
    };
};