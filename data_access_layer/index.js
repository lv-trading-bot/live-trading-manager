let Config_Manager = require('./config_manager');
let Portfolio_Manager = require('./portfolio_manager');
let Status_Manager = require('./status_manager');
let Trade_Manager = require('./trade_manager');
let Trigger_Manager = require('./trigger_manager');
let Advice_Manager = require('./advice_manager');
let utils = require('../utils');

const objExport = {
    config_manager: new Config_Manager({
        connectionString: utils.getConnectionString(),
        dbName: utils.getDbName()
    }),
    portfolio_manager: new Portfolio_Manager({
        connectionString: utils.getConnectionString(),
        dbName: utils.getDbName()
    }),
    status_manager: new Status_Manager({
        connectionString: utils.getConnectionString(),
        dbName: utils.getDbName()
    }),
    trade_manager: new Trade_Manager({
        connectionString: utils.getConnectionString(),
        dbName: utils.getDbName()
    }),    
    advice_manager: new Advice_Manager({
        connectionString: utils.getConnectionString(),
        dbName: utils.getDbName()
    }),
    trigger_manager: new Trigger_Manager({
        connectionString: utils.getConnectionString(),
        dbName: utils.getDbName()
    }),
}

module.exports = objExport;