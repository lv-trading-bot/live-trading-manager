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
     * @param {Number} limit - limit, default 100
     * @param {pgae} page - page, default 1
     */
    read(id, asset, currency, condition = {}, sort = {}, limit = 100, page = 1) {
        return this._read(id, TYPE, asset, currency, condition, sort, limit, page);
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

    // deleteAllThenInsert(id, asset, currency, trigges) {
    //     if (!this.db) {
    //         setTimeout(() => {
    //             this.deleteAllThenInsert(id, asset, currency, trigges);
    //         }, 1000);
    //         return;
    //     }

    //     const collection = this.db.collection(this._generate_collection_name(id, TYPE, asset, currency));

    //     collection.deleteMany({}, (err, res) => {
    //         this.write(id, asset, currency, trigges)
    //     })
    // }
}

module.exports = Trigger_Manager;