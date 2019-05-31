const _ = require('lodash');
const log = require('../log');
const moment = require('moment');

const {portfolio_manager} = require('../data_access_layer');
const {typeSystemAction, emitEvent} = require('../socket');

// Update or insert portfolio
const putPortfolio = function (req, res, next) {
    let id = req.body.id;
    let asset = req.body.asset;
    let currency = req.body.currency;
    let portfolio = req.body.portfolio;
    let is_new = req.body.is_new;

    if (!id) {
        throw new Error("Thiếu id");
    }
    if (!asset) {
        throw new Error("Thiếu asset");
    }
    if (!currency) {
        throw new Error("Thiếu currency");
    }
    if (!portfolio) {
        throw new Error("Thiếu portfolio");
    }
    if (is_new === undefined) {
        throw new Error("Thiếu is_new");
    }

    if (_.isObject(portfolio)) {
        try {
            if(is_new) {
                portfolio_manager.updateOrInsert(id, asset, currency, {...portfolio, initPortfolio: portfolio, startTime: moment().utc().toISOString()});
            } else {
                portfolio_manager.updateOrInsert(id, asset, currency, portfolio);
            }
        } catch (error) {
            log.warn(error);
        }
    }

    emitEvent(typeSystemAction.ON_PUT_PORTFOLIO, {asset, currency, id})

    res.end();
}

const getPortfolio = function (req, res, next) {
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

    if ( page !== undefined && limit === undefined) {
        throw new Error("Page work with limit!");
    }

    portfolio_manager.read(condition, sort, limit, page)
        .then(arrayPortfolio => {
            res.setHeader('content-type', 'json/text')
            res.end(JSON.stringify(arrayPortfolio));
        })
        .catch(err => {
            log.warn(err);
            throw err;
        })
}

module.exports = {
    putPortfolio,
    getPortfolio
}