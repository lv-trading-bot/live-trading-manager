const Trigger_Manager = require('../data_access_layer/trigger_manager');
const utils = require('../utils');
const _ = require('lodash');

const trigger_mannager = new Trigger_Manager({
    connectionString: utils.getConnectionString(), 
    dbName: utils.getDbName()
});

// Update trigger
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
        trigger_mannager.update(id, trigger_id, asset, currency, trigger);
    }

    res.end();
}

// Insert triiger
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

    if(_.isObject(trigger)) {
        trigger_mannager.write(id, asset, currency, [trigger]);
    }

    res.end();

}

module.exports = {
    putTrigger,
    postTrigger
}