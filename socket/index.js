const _ = require('lodash');
const log = require('../log');

// Type - handler
const typeSystemAction = {
    ON_NEW_CONNECTED_SYSTEM: "onNewConnectedSystem",
    ON_CHANGE_STATUS_SYSTEM: "onChangStatusSystem",
    ON_POST_TRIGGER: "onPostTrigger",
    ON_PUT_TRIGGER: "onPutTrigger",
    ON_PUT_PORTFOLIO: "onPutPortfolio",
    ON_POST_TRADE: "onPostTrade",
    ON_UPDATE_PRICE: "onUpdatePrice",
    
    CONNECTED: "onConnected",
    DISCONNECT: "onDisconnected"
}

// Type - Type
const typeUiAction = {

}

const systemChanle = "systemChannel";
const uiChanle = "uiChannel";

const sendDataToUi = (socket, data) => {
    socket.emit(uiChanle, data);
}

const systemHandler = require('./handler');

let uiSockets = [];
let systemSockets = [];

module.exports.init = (server) => {
    const io = require('socket.io')(server);
    io.on("connection", (socket) => {
        let saveRandomId = 0;
        let saveInfo = null;
        socket.on("onConnect", (type, random, info) => {
            saveRandomId = random;
            saveInfo = {...info, random_id: random};
            if (type === 'system') {
                systemSockets.push({random, socket, info});
                log.info('New System connect', info);
                log.info('System Socket Connection:', systemSockets.length);

                // Handle sự kiện kết nối cho system
                systemHandler[typeSystemAction["CONNECTED"]](saveInfo, uiSockets, sendDataToUi);
                // Tìm handler phù hợp để handle
                socket.on(systemChanle, ({type, data}) => {
                    if(typeSystemAction[type] && systemHandler[typeSystemAction[type]]) {
                        systemHandler[typeSystemAction[type]](data, uiSockets, sendDataToUi);
                    }
                })

            } else if (type === 'ui') {
                uiSockets.push({random, socket});
                log.info('New Ui connect');
                log.info('UI Socket connection:', uiSockets.length);
            }
        })

        socket.on("disconnect", () => {
            let systemDisconnect = _.remove(systemSockets, soc => soc.random === saveRandomId);
            if( !_.isEmpty(systemDisconnect)) {
                systemHandler[typeSystemAction["DISCONNECT"]](saveInfo, uiSockets, sendDataToUi);
                log.info('System disconnect', systemDisconnect[0].info);
                log.info('System Socket Connection:', systemSockets.length);
            }

            if( !_.isEmpty(_.remove(uiSockets, soc => soc.random === saveRandomId))) {
                log.info('Ui disconnect');
                log.info('UI Socket connection:', uiSockets.length);
            }
        })
    })
}

module.exports.emitEvent = (from) => {
    console.log('emittt ', from, uiSockets.length);
}