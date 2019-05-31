const _ = require('lodash');

const {trade_manager} = require('../data_access_layer');

// Insert trade
const postTrade = function (req, res, next) {
    let id = req.body.id;
    let asset = req.body.asset;
    let currency = req.body.currency;
    let trade = req.body.trade;

    if (!id) {
        throw new Error("Thiếu id");
    }
    if (!asset) {
        throw new Error("Thiếu asset");
    }
    if (!currency) {
        throw new Error("Thiếu currency");
    }
    if (!trade) {
        throw new Error("Thiếu trade");
    }

    if (_.isObject(trade)) {
        trade_manager.write(id, asset, currency, trade);
    }

    res.end();

}

const getTrade = function (req, res, next) {
    let id = req.query.id;
    let asset = req.query.asset;
    let currency = req.query.currency;

    if (!id) {
        throw new Error("Thiếu id");
    }
    if (!asset) {
        throw new Error("Thiếu asset");
    }
    if (!currency) {
        throw new Error("Thiếu currency");
    }

    let condition, sort, limit, page;
    try {
        condition = req.query.condition ? JSON.parse(req.query.condition) : undefined;
    } catch (error) {
        log.warn(error);
        condition = undefined;
    }

    try {
        sort = req.query.sort ? JSON.parse(req.query.sort) : undefined;
    } catch (error) {
        log.warn(error);
        sort = undefined;
    }

    try {
        limit = req.query.limit ? parseInt(req.query.limit) : undefined;
        if (isNaN(limit)) {
            limit = undefined;
        }
    } catch (error) {
        log.warn(error);
        limit = undefined;
    }

    try {
        page = req.query.page ? parseInt(req.query.page) : undefined;
        if (isNaN(page)) {
            page = undefined;
        }
    } catch (error) {
        log.warn(error);
        page = undefined;
    }

    if (page !== undefined && limit === undefined) {
        throw new Error("Page work with limit!");
    }

    trade_manager.read(id, asset, currency, condition, sort, limit, page)
        .then(arrayTrade => {
            res.setHeader('content-type', 'json/text')
            res.end(JSON.stringify(arrayTrade));
        })
        .catch(err => {
            log.warn(err);
            throw err;
        })
}

module.exports = {
    postTrade,
    getTrade
}