const Base_Manager = require('./base_manager');

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
        this._update(undefined, "configs", undefined, undefined, {id}, {
            ...config,
            id,
            asset_name: asset,
            currency_name: currency,
        })
    }
}

module.exports = Config_Manager;