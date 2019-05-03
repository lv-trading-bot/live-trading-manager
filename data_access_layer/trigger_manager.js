const Base_Manager = require('./base_manager');

const TYPE = "trigger";

/**
 * @param {string} connectionString - connection string to mongodb
 * @param {string} dbName - database name 
 */
class Trigger_Manager extends Base_Manager {
    constructor(props) {
        super(props);
    }

    /**
     * @returns {None} - No return
     * @param {String} id - String of id
     * @param {String} asset - name of asset
     * @param {String} currency - name of currency
     * @param {Array} trigges - trigges
     */
    write(id, asset, currency, trigges) {
        this._write(id, TYPE, asset, currency, trigges);
    }

    /**
     * @returns {Promise}
     * @param {String} id - String of id
     * @param {String } asset - name of asset
     * @param {String} currency - name of currency
     * @param {Object} condition - Object condition of function find of mongodb
     * @param {Object} sort - Object sort of function sort of mongodb
     * @param {Number} limit - limit
     */
    read(id, asset, currency, condition, sort = {}, limit = 100) {
        return this._read(id, TYPE, asset, currency, condition, sort, limit);
    }

    /**
     * Update or insert one record
     * @param {string} idPair - id của pair
     * @param {string} idTrigger - id của trigger
     * @param {string} asset - tên của asset
     * @param {string} currency - tên của currency
     * @param {Object} triggerData - data cần lưu
     */
    update(idPair, idTrigger, asset, currency, triggerData) {
        this._update(idPair, TYPE, asset, currency, {id: idTrigger}, triggerData);
    }
}

module.exports = Trigger_Manager;