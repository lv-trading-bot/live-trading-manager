var utils = {};
let configName = "config";
/**
 * @param {Number} milisecond 
 */
utils.wait = (milisecond) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve();
        }, milisecond);
    })
}

utils.getConfig = () => {
    return require('./' + configName);
}

utils.getConnectionString = () => {
    return (require('./' + configName)).mongodb.connectionString;
}

utils.getDbName = () => {
    return (require('./' + configName)).mongodb.dbName;
}

module.exports = utils;