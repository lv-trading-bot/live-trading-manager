const Base_Manager = require('./base_manager');

const TYPE = 'statuss';
class Status_Manager extends Base_Manager {
    constructor(props) {
        super(props);
    }

    /**
     * No return
     * @param {string} random_id - random_id lúc sinh ra
     * @param {Object} status_data - status data
     */
    updateOrInsert(random_id, status_data) {
        this._update(undefined, TYPE, undefined, undefined, {random_id}, status_data)
    }

    /**
     * No return
     * @param {Object} condition - condition
     * @param {Object} sort - sort
     * @param {Number} limit - limit, default 100
     * @param {Number} page - page, defaut 1
     */
    read(condition = {}, sort = {}, limit = 100, page = 1) {
        return this._read(undefined, TYPE, undefined, undefined, condition, sort, limit, page);
    }
}

module.exports = Status_Manager;