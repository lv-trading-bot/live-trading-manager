const _ = require('lodash');

const {trigger_manager} = require('../data_access_layer');

// Update or insert trigger
const putTrigger = function(req, res, next) {
    let id = req.body.id;
    let trigger_id = req.body.trigger_id;
    let asset = req.body.asset;
    let currency = req.body.currency;
    let trigger = req.body.trigger;

    if(!id) {
        throw new Error("Thiếu id");
    }
    if(!asset) {
        throw new Error("Thiếu asset");
    }
    if(!currency) {
        throw new Error("Thiếu currency");
    }
    if(!trigger) {
        throw new Error("Thiếu trigger");
    }
    if(!trigger_id) {
        throw new Error("Thiếu trigger_id");
    }

    if(_.isObject(trigger)) {
        trigger_manager.update(id, trigger_id, asset, currency, trigger);
    }

    res.end();
}

// Insert trigger
const postTrigger = function(req, res, next) {
    let id = req.body.id;
    let asset = req.body.asset;
    let currency = req.body.currency;
    let trigger = req.body.trigger;

    if(!id) {
        throw new Error("Thiếu id");
    }
    if(!asset) {
        throw new Error("Thiếu asset");
    }
    if(!currency) {
        throw new Error("Thiếu currency");
    }
    if(!trigger) {
        throw new Error("Thiếu trigger");
    }

    if(_.isArray(trigger)) {
        trigger_manager.write(id, asset, currency, trigger);
    } else
    if(_.isObject(trigger)) {
        trigger_manager.write(id, asset, currency, [trigger]);
    }

    res.end();

}

const getTrigger = function (req, res, next) {
    let id = req.query.id;
    let asset = req.query.asset;
    let currency = req.query.currency;

    if(!id) {
        throw new Error("Thiếu id");
    }
    if(!asset) {
        throw new Error("Thiếu asset");
    }
    if(!currency) {
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

    if ( page !== undefined && limit === undefined) {
        throw new Error("Page work with limit!");
    }

    trigger_manager.read(id, asset, currency, condition, sort, limit, page)
        .then(arrayTrigger => {
            res.setHeader('content-type', 'json/text')
            res.end(JSON.stringify(arrayTrigger));
        })
        .catch(err => {
            log.warn(err);
            throw err;
        })
}

module.exports = {
    putTrigger,
    postTrigger,
    getTrigger
}