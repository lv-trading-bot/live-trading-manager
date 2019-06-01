let config = {};

config.mongodb = {
    connectionString: "mongodb://localhost:27017",
    dbName:  "db_live_trading_manager"
}

config.machine_learning_api = {
    base: "http://localhost:5000",
    live: "/live"
}

config.loggerAdapter = 'file';

module.exports = config;