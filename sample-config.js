let config = {};

config.mongodb = {
    connectionString: "mongodb://localhost:27017",
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
    base: "http://localhost:5000",
    live: "/live"
}

module.exports = config;