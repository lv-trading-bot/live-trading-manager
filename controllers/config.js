const _ = require('lodash');
const log = require('../log');

const {config_manager} = require('../data_access_layer');

const getConfig = function (req, res, next) {
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

    config_manager.read(condition, sort, limit, page)
        .then(arrayConfig => {
            res.setHeader('content-type', 'json/text')
            res.end(JSON.stringify(arrayConfig));
        })
        .catch(err => {
            log.warn(err);
            throw err;
        })
}

module.exports = {
    getConfig
}