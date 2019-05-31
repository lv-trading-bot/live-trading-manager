const {config_manager} = require('../data_access_layer');
const {typeSystemAction, emitEvent} = require('../socket');

const generate_id = () => {
    return `${new Date().getTime()}${Math.floor(Math.random()*1000)}`; 
}

const postInit = function (req, res, next) {
    let config = req.body.config;
    let asset = req.body.asset;
    let currency = req.body.currency;
    let id = req.body.id;

    if(!asset) {
        throw new Error("Thiếu asset");
    }
    if(!currency) {
        throw new Error("Thiếu currency");
    }
    if(!config) {
        throw new Error("Thiếu config");
    }

    id = id ? id : generate_id();

    config_manager.updateOrInsert(id, asset, currency, config);

    emitEvent(typeSystemAction.ON_NEW_CONNECTED_SYSTEM, {asset, currency, id});

    res.setHeader("content-type", "json/text")
    res.end(JSON.stringify({
        id
    }));
}

module.exports.postInit = postInit;