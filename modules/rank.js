var Rank = function () {
    let histories = null;

    const init = () => {
        histories = storage.read(HISTORIES) || [];

        createPracticeRank();
    };

    const calculatePracticeRankPlayers = () => {
        practiceHistories = histories.filter(history => history.gameMode === GAME_MODE_PRACTICE);

        return practiceHistories.map(history => {
            return {
                playerName: history.players[0].name,
                timeLength: (history.endTime - history.startTime) / 1000
            };
        }).sort((a, b) => a.timeLength < b.timeLength ? -1 : 1);
    };

    const createPracticeRank = () => {
        const headerElement = document.createElement("h2");
        
        headerElement.innerHTML = "Practice Rank";

        const tableElement = document.createElement("table");

        template.gameRankElement.appendChild(headerElement);

        const rankedPlayers = calculatePracticeRankPlayers();

        rankedPlayers.forEach(player => {
            const tr = document.createElement("tr");
            const td1 = document.createElement("td");
            const td2 = document.createElement("td");

            td1.innerHTML = player.playerName;
            td2.innerHTML = player.timeLength;

            tr.appendChild(td1);
            tr.appendChild(td2);

            tableElement.appendChild(tr);
        });

        template.gameRankElement.appendChild(tableElement);
    };

    init();
};