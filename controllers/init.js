// const Trigger_Manager = require('../data_access_layer/trigger_manager');
// const Portfolio_Manager = require('../data_access_layer/portfolio_manager');
// const utils = require('../utils');
// const _ = require('lodash');

// const trigger_mannager = new Trigger_Manager({
//     connectionString: utils.getConnectionString(), 
//     dbName: utils.getDbName()
// });

// const portfolio_manager = new Portfolio_Manager({
//     connectionString: utils.getConnectionString(), 
//     dbName: utils.getDbName()
// });

const generate_id = () => {
    return `${new Date().getTime()}${Math.floor(Math.random()*1000)}`; 
}

const getInit = function (req, res, next) {
    // let asset = req.body.asset;
    // let currency = req.body.currency;
    // // let triggers = req.body.triggers;
    // let portfolio = req.body.portfolio;

    // if(!asset) {
    //     throw new Error("Thiếu asset");
    // }
    // if(!currency) {
    //     throw new Error("Thiếu currency");
    // }
    // if(!triggers) {
    //     throw new Error("Thiếu triggers");
    // }
    // if(!portfolio) {
    //     throw new Error("Thiếu portfolio");
    // }

    const id = generate_id();

    // Save triggers
    // if(_.isArray(triggers) && triggers.length > 0) {
    //     trigger_mannager.write(id, asset, currency, triggers);
    // }

    // Save portfolio
    // if(_.isObject(portfolio)) {
    //     portfolio_manager.updateOrInsert(id, asset, currency, portfolio);
    // }

    res.setHeader("content-type", "json/text")
    res.end(JSON.stringify({
        id
    }))
}

module.exports.getInit = getInit;