const _ = require('lodash');
const log = require('../log');

// Type - handler
const typeSystemAction = {
    UPDATE_PRICE: "updatePrice",
}

// Type - Type
const typeUiAction = {

}

const systemChanle = "systemChanle";
const uiChanle = "uiChanle";

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
        socket.on("onConnect", (type, random) => {
            saveRandomId = random;
            if (type === 'system') {
                systemSockets.push({random, socket});
                log.info('New System connect');
                log.info('System Socket Connection:', systemSockets.length);

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
            if( !_.isEmpty(_.remove(systemSockets, soc => soc.random === saveRandomId))) {
                log.info('System disconnect');
                log.info('System Socket Connection:', systemSockets.length);
            }
            if( !_.isEmpty(_.remove(uiSockets, soc => soc.random === saveRandomId))) {
                log.info('Ui disconnect');
                log.info('UI Socket connection:', uiSockets.length);
            }
        })
    })
}

// module.exports.payment = (from, to, amount) => {
//     for(let i = 0; i < sockets.length; i++) {
//         if(sockets[i].address === to.address) {
//             sockets[i].socket.emit(chainel, {
//                 type: typeAction.RECEIVE_MONEY,
//                 from: from.address,
//                 name: from.name,
//                 amount
//             })
//         }
//     }
// }

// module.exports.post = (account, content) => {
//     for(let i = 0; i < account.followers.length; i++) {
//         for(let j = 0; j < sockets.length; j++) {
//             if(sockets[j].address === account.followers[i]) {
//                 sockets[j].socket.emit(chainel, {
//                     type: typeAction.FOLLOWING_POST,
//                     content,
//                     address: account.address,
//                     name: account.name
//                 })
//             }
//         }
//     }
// }

// // type 1: comment
// // type 2: react
// module.exports.interact = (fromAdress, to, type, content) => {
//     Account.findOne({address: fromAdress}, {name: 1}, (err, res) => {
//         if(!err && res) {
//             for(let i = 0; i < sockets.length; i++) {
//                 if(sockets[i].address === to.address) {
//                     if(type === 1) {
//                         sockets[i].socket.emit(chainel, {
//                             type: typeAction.RECEIVE_COMMENT,
//                             address: fromAdress,
//                             name: res.name,
//                             content
//                         })
//                     } else 
//                     if(type === 2) {
//                         sockets[i].socket.emit(chainel, {
//                             type: typeAction.RECEIVE_REACTION,
//                             address: fromAdress,
//                             name: res.name,
//                             reaction: content
//                         })
//                     }
//                 }
//             }  
//         }
//     })
// }

// module.exports.followings = (from, to) => {
//     for(let i = 0; i < sockets.length; i++) {
//         if(sockets[i].address === to.address) {
//             sockets[i].socket.emit(chainel, {
//                 type: typeAction.RECEIVE_FOLLOWINGS,
//                 address: from.address,
//                 name: from.name
//             })
//         }
//     }
// }

// module.exports.unFollowings = (from, to) => {
//     for(let i = 0; i < sockets.length; i++) {
//         if(sockets[i].address === to.address) {
//             sockets[i].socket.emit(chainel, {
//                 type: typeAction.RECEIVE_UNFOLLOWINGS,
//                 address: from.address,
//                 name: from.name
//             })
//         }
//     }
// }