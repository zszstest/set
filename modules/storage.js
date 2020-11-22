var Storage = function () {
    const HISTORIES = "histories";

    let history = null;

    this.startGame = (startTime, players) => {
        history = new History(startTime, players);

        console.log("Game started at ", new Date(startTime));
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

    this.addHistoryItem = (actionTime, player, action, result) => {
        const historyItem = new HistoryItem(actionTime, player, action, result);

        history.items.push(historyItem);
    };

    this.save = (name, data) => {
        localStorage.setItem(name, JSON.stringify(data));
    };

    this.read = (name) => {
        const data = localStorage.getItem(name);

        return data ? JSON.parse(data) : null;
    };
};