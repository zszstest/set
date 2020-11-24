const defaultSettings = {
    defaultPlayerNumber: 1,
};

const template = new Template();

const storage = new Storage();
const settings = new Settings();
const rank = new Rank();
const gameEngine = new GameEngine();

const start = function () {
    const config = settings.createConfig();

    template.changeAreas();

    gameEngine.startGame(config);
};
