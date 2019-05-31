const {status_manager} = require('../data_access_layer');

module.exports = {
    updatePrice: (data, uisockets, sendDataToUi) => {
        // console.log('updateprice', data);
    },
    onConnected: (data, uisockets, sendDataToUi) => {
        status_manager.updateOrInsert(data.random_id, {...data, status: "connected"});
    },
    onDisconnected: (data, uisockets, sendDataToUi) => {
        status_manager.updateOrInsert(data.random_id, {...data, status: "disconnected"});
    }
}