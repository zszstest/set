const defaultSettings = {
    defaultPlayerNumber: 1,
};

const settings = new Settings();
const gameEngine = new GameEngine();

const start = function () {
    const config = settings.createConfig();

    gameEngine.startGame(config);
};
