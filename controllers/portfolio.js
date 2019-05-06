const Portfolio_Manager = require('../data_access_layer/portfolio_manager');
const utils = require('../utils');
const _ = require('lodash');

const portfolio_manager = new Portfolio_Manager({
    connectionString: utils.getConnectionString(), 
    dbName: utils.getDbName()
});

// Update or insert portfolio
const putPortfolio = function(req, res, next) {
    let id = req.body.id;
    let asset = req.body.asset;
    let currency = req.body.currency;
    let portfolio = req.body.portfolio;

    if(!id) {
        throw new Error("Thiếu id");
    }
    if(!asset) {
        throw new Error("Thiếu asset");
    }
    if(!currency) {
        throw new Error("Thiếu currency");
    }
    if(!portfolio) {
        throw new Error("Thiếu portfolio");
    }


    if(_.isObject(portfolio)) {
        portfolio_manager.updateOrInsert(id, asset, currency, portfolio);
    }

    res.end();
}

module.exports = {
    putPortfolio
}