const {config_manager} = require('../data_access_layer');

const generate_id = () => {
    return `${new Date().getTime()}${Math.floor(Math.random()*1000)}`; 
}

const postInit = function (req, res, next) {
    let config = req.body.config;
    let asset = req.body.asset;
    let currency = req.body.currency;
    let id = req.body.id;
    // // let triggers = req.body.triggers;
    // let portfolio = req.body.portfolio;

    if(!asset) {
        throw new Error("Thiếu asset");
    }
    if(!currency) {
        throw new Error("Thiếu currency");
    }
    if(!config) {
        throw new Error("Thiếu config");
    }
    // if(!triggers) {
    //     throw new Error("Thiếu triggers");
    // }
    // if(!portfolio) {
    //     throw new Error("Thiếu portfolio");
    // }

    id = id ? id : generate_id();

    config_manager.updateOrInsert(id, asset, currency, config);

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

module.exports.postInit = postInit;