const Trade_Manager = require('../data_access_layer/trade_manager');
const utils = require('../utils');
const _ = require('lodash');

const trade_mannager = new Trade_Manager({
    connectionString: utils.getConnectionString(), 
    dbName: utils.getDbName()
});

// Insert trade
const postTrade = function(req, res, next) {
    let id = req.body.id;
    let asset = req.body.asset;
    let currency = req.body.currency;
    let trade = req.body.trade;

    if(!id) {
        throw new Error("Thiếu id");
    }
    if(!asset) {
        throw new Error("Thiếu asset");
    }
    if(!currency) {
        throw new Error("Thiếu currency");
    }
    if(!trade) {
        throw new Error("Thiếu trade");
    }

    if(_.isObject(trade)) {
        trade_mannager.write(id, asset, currency, trade);
    }

    res.end();

}

module.exports = {
    postTrade
}