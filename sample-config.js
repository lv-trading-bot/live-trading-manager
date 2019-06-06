let config = {};

config.mongodb = {
    connectionString: process.env.MONGO_URL || "mongodb://localhost:27017",
    dbName:  "db_live_trading_manager"
}

config.machine_learning_api = {
    base: process.env.ML_SERVER_BASE_API || "http://localhost:3002",
    live: "/live"
}

console.log(`${process.env.DOCKER_HOST}:3006`);
config.gekko_igniter_api = {
    base: `http://${process.env.DOCKER_HOST}:3006`,
    runGekko: '/run-gekko',
    stopGekko: '/stop-gekko'
}

config.loggerAdapter = 'file';

module.exports = config;