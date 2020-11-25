var Rank = function () {
    let histories = null;

    const init = () => {
        histories = storage.read(HISTORIES) || [];

        createCompetitionRank(GAME_LEVEL_BEGINNER);
        createCompetitionRank(GAME_LEVEL_ADVANCED);
    };

    const calculateCompetitionRankPlayers = (gameLevel) => {
        competitionHistories = histories.filter(
            (history) =>
                history.gameMode === GAME_MODE_COMPETITION &&
                history.gameLevel === gameLevel &&
                history.players.length === 1
        );

        return competitionHistories.map((history) => {
            return {
                playerName: history.players[0].name,
                timeLength: (history.endTime - history.startTime) / 1000,
            };
        }).sort((a, b) => (a.timeLength < b.timeLength ? -1 : 1));
    };

    const createCompetitionRank = (gameLevel) => {
        const headerElement = document.createElement("h2");

        headerElement.innerHTML = gameLevel[0].toUpperCase() + gameLevel.slice(1) + " Competition Rank";

        const tableElement = document.createElement("table");

        template.gameRankElement.appendChild(headerElement);

        const rankedPlayers = calculateCompetitionRankPlayers(gameLevel);

        rankedPlayers.forEach((player) => {
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
