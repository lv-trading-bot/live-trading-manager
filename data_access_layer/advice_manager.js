const Base_Manager = require('./base_manager');

const TYPE = "advice";

/**
 * @param {string} connectionString - connection string to mongodb
 * @param {string} dbName - database name 
 */
class Advide_Manager extends Base_Manager {
    constructor(props) {
        super(props);
    }

    /**
     * @returns {None} - No return
     * @param {String} id - String of id
     * @param {String} asset - name of asset
     * @param {String} currency - name of currency
     * @param {Object} advice - trade
     */
    write(id, asset, currency, advice) {
        this._write(id, TYPE, asset, currency, [advice]);
    }

    /**
     * @returns {Promise}
     * @param {String} id - String of id
     * @param {String } asset - name of asset
     * @param {String} currency - name of currency
     * @param {Object} condition - Object condition of function find of mongodb
     * @param {Object} sort - Object sort of function sort of mongodb
     * @param {Number} limit - limit, default 100
     * @param {Number} page - page, default 1.
     */
    read(id, asset, currency, condition = {}, sort = {}, limit = 100, page = 1) {
        return this._read(id, TYPE, asset, currency, condition, sort, limit, page);
    }
}

module.exports = Advide_Manager;