const {status_manager} = require('../data_access_layer');
const _ = require('lodash');

const broadcast = (listSocket, senDataToUiFn, data) => {
    _.forEach(listSocket, s => senDataToUiFn(s, data));
}

module.exports = {
    onConnected: (data, type, uisockets, sendDataToUi) => {
        status_manager.updateOrInsert(data.random_id, {...data, status: "connected"});
        broadcast(uisockets, sendDataToUi, {type: "NEW_SYSTEM_CONNECTED", data});
    },
    onDisconnected: (data, type, uisockets, sendDataToUi) => {
        status_manager.updateOrInsert(data.random_id, {...data, status: "disconnected"});
        broadcast(uisockets, sendDataToUi, {type: "SYSTEM_DISCONNECTED", data});
    },
    onPostTrigger: (data, type, uisockets, sendDataToUi) => {
        broadcast(uisockets, sendDataToUi, {type, data});
    },
    onPutTrigger: (data, type, uisockets, sendDataToUi) => {
        broadcast(uisockets, sendDataToUi, {type, data});
    },
    onPutPortfolio: (data, type, uisockets, sendDataToUi) => {
        broadcast(uisockets, sendDataToUi, {type, data});
    },
    onPostTrade: (data, type, uisockets, sendDataToUi) => {
        broadcast(uisockets, sendDataToUi, {type, data});
    },
    onPostAdvice: (data, type, uisockets, sendDataToUi) => {
        broadcast(uisockets, sendDataToUi, {type, data});
    },
    onUpdatePrice: (data, type, uisockets, sendDataToUi) => {
        broadcast(uisockets, sendDataToUi, {type, data});
    },
    onPutPairControl: (data, type, uisockets, sendDataToUi) => {
        broadcast(uisockets, sendDataToUi, {type, data});
    },
}