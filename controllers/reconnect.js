const utils = require('../utils');
const _ = require('lodash');

const {portfolio_manager} = require('../data_access_layer');

// Reconnect không cập nhật lại trigger
const postReconnect = function (req, res, next) {
    let id = req.body.id;
    let asset = req.body.asset;
    let currency = req.body.currency;
    // let triggers = req.body.triggers;
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
    // if(!triggers) {
    //     throw new Error("Thiếu triggers");
    // }
    if(!portfolio) {
        throw new Error("Thiếu portfolio");
    }

    // // Save triggers
    // if(_.isArray(triggers) && triggers.length > 0) {
    //     trigger_mannager.deleteAllThenInsert(id, asset, currency, triggers);
    // }

    // Save portfolio
    if(_.isObject(portfolio)) {
        portfolio_manager.updateOrInsert(id, asset, currency, portfolio);
    }

    res.setHeader("content-type", "json/text")
    res.end(JSON.stringify({
        id
    }))
}

module.exports.postReconnect = postReconnect;