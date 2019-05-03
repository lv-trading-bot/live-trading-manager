const Base_Manager = require('./base_manager');

class Portfolio_Manager extends Base_Manager {
    constructor(props) {
        super(props);
    }

    /**
     * No return
     * @param {string} id - id của pair
     * @param {string} asset - tên của asset
     * @param {string} currency - tên của currency
     * @param {Object} portfolio - portfolio
     */
    updateOrInsert(id, asset, currency, portfolio) {
        this._update(undefined, "portfolios", undefined, undefined, {id}, {
            ...portfolio,
            id,
            asset_name: asset,
            currency_name: currency,
        })
    }
}

module.exports = Portfolio_Manager;