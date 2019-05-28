const Status_Manager = require('../data_access_layer/status_manager');
const utils = require('../utils');

const status_manager = new Status_Manager({
    connectionString: utils.getConnectionString(),
    dbName: utils.getDbName()
});

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