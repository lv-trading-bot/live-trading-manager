const Portfolio_Manager = require('../data_access_layer/portfolio_manager');
const utils = require('../utils');
const _ = require('lodash');
const log = require('../log');

const portfolio_manager = new Portfolio_Manager({
    connectionString: utils.getConnectionString(),
    dbName: utils.getDbName()
});

// Update or insert portfolio
const putPortfolio = function (req, res, next) {
    let id = req.body.id;
    let asset = req.body.asset;
    let currency = req.body.currency;
    let portfolio = req.body.portfolio;

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


    if (_.isObject(portfolio)) {
        try {
            portfolio_manager.updateOrInsert(id, asset, currency, portfolio);
        } catch (error) {
            log.warn(error);
        }
    }

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