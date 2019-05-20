let config = {};

config.mongodb = {
    connectionString: process.env.MONGO_URL || "mongodb://localhost:27017",
    dbName:  "db_live_trading_manager"
}

config.pairs = {
    listPairs: [
        {
            asset: "BTC",
            currency: "USDT",
            candleSize: 60
        }
    ]
}

config.machine_learning_api = {
    base: process.env.ML_SERVER_BASE_API || "http://localhost:3002",
    live: "/live"
}

config.production = true;
config.loggerAdapter = 'file';

module.exports = config;