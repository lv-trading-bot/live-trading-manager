const Base_Manager = require('./base_manager');
const TYPE = "configs";
class Config_Manager extends Base_Manager {
    constructor(props) {
        super(props);
    }

    /**
     * No return
     * @param {string} id - id của pair
     * @param {string} asset - tên của asset
     * @param {string} currency - tên của currency
     * @param {Object} config - config
     */
    updateOrInsert(id, asset, currency, config) {
        this._update(undefined, TYPE, undefined, undefined, {id}, {
            ...config,
            id,
            asset_name: asset,
            currency_name: currency,
        })
    }

    /**
     * @param {Object} condition - condition
     * @param {Object} sort - sort
     * @param {Number} limit - limit, default 100
     * @param {Number} page - page, defaut 1
     */
    read(condition = {}, sort = {}, limit = 100, page = 1) {
        return this._read(undefined, TYPE, undefined, undefined, condition, sort, limit, page);
    }
}

module.exports = Config_Manager;