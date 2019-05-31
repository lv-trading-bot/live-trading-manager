const _ = require('lodash');
const log = require('../log');
const moment = require('moment');

const {pair_control_manager} = require('../data_access_layer');
const {typeSystemAction, emitEvent} = require('../socket');

const putPairControl = function (req, res, next) {
    let id = req.body.id;
    let asset = req.body.asset;
    let currency = req.body.currency;
    let accept_buy = req.body.accept_buy;
    let set_by = req.body.set_by;

    if (!id) {
        throw new Error("Thiếu id");
    }
    if (!asset) {
        throw new Error("Thiếu asset");
    }
    if (!currency) {
        throw new Error("Thiếu currency");
    }
    if (accept_buy === undefined) {
        throw new Error("Thiếu accept_buy");
    }
    if (!set_by) {
        throw new Error("Thiếu set_by");
    }

    pair_control_manager.updateOrInsert(id, asset, currency, {accept_buy, set_by, last_update: moment().utc().toISOString()});

    if (set_by.toLowerCase() === 'gekko') {
        emitEvent(typeSystemAction.ON_PUT_PAIR_CONTROL, {asset, currency, id})
    }

    res.end();
}

const getPairControl = function (req, res, next) {
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

    pair_control_manager.read(condition, sort, limit, page)
        .then(arrayPairControl => {
            res.setHeader('content-type', 'json/text')
            res.end(JSON.stringify(arrayPairControl));
        })
        .catch(err => {
            log.warn(err);
            throw err;
        })
}

module.exports = {
    putPairControl,
    getPairControl
}