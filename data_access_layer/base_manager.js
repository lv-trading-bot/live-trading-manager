const MongoClient = require('mongodb').MongoClient;
const utils = require('../utils');
const log = require('../log');
const _ = require('lodash');

const generate_collection_name = (id, type, asset, currency) => {
    let display = [id, type, asset, currency];
    display = _.filter(display, item => item);
    return display.join('-');
}

/**
 * @param {string} connectionString - connection string to mongodb
 * @param {string} dbName - database name 
 */
class Base_Manager {
    constructor({ connectionString, dbName }) {
        this.connectionString = connectionString;
        this.dbName = dbName;
        this.db = null;
        this._init();
    }

    async _init() {
        try {
            this.db = (await MongoClient.connect(this.connectionString, { useNewUrlParser: true })).db(this.dbName);
            log.info("Connected successfully to mongodb server");
        }
        catch (err) {
            throw err;
        }
    }
    /**
     * 
     * @param {string} id - id của pair
     * @param {string} type - loại (trigger, trade)
     * @param {string} asset - tên của asset
     * @param {string} currency - tên của currency
     * @param {Array} data - data cần lưu
     */
    _write(id, type, asset, currency, data) {
        if (!this.db) {
            setTimeout(() => {
                this.write(id, type, asset, currency);
            }, 1000);
            return;
        }

        const collection = this.db.collection(generate_collection_name(id, type, asset, currency));
        collection.insertMany(data, (err, res) => {
            if (err) throw err;
        })
    }
    /**
     * @returns {Array}
     * @param {string} id - id của pair
     * @param {string} type - loại (trigger, trade)
     * @param {string} asset - tên của asset
     * @param {string} currency - tên của currency
     * @param {Object} condition - object điều kiện sẽ đưa vào cho mongo ở hàm find,
     * @param {Object} sort - object sort sẽ đưa vào hàm sort
     * @param {Number} limit - limit record, default 100
     */
    _read(id, type, asset, currency, condition, sort = {}, limit = 100) {
        return new Promise(async (resolve, reject) => {
            if (!this.db) {
                await utils.wait(1000);
                resolve(await this.read(id, type, asset, currency, condition));
                return;
            }
            const collection = this.db.collection(generate_collection_name(id, type, asset, currency, sort, limit));
            collection.find(condition).sort(sort).limit(limit).toArray((err, res) => {
                if (err) reject(err);
                else resolve(res);
            })
        })
    }

    /**
     * Update or insert one record
     * @param {string} id - id của pair
     * @param {string} type - loại (trigger, trade)
     * @param {string} asset - tên của asset
     * @param {string} currency - tên của currency
     * @param {Object} condition - object điều kiện sẽ đưa vào cho mongo ở hàm findOneAndReplace,
     * @param {Object} data - data cần lưu
     */
    _update(id, type, asset, currency, condition, data) {
        if (!this.db) {
            setTimeout(() => {
                this.write(id, type, asset, currency, condition, data);
            }, 1000);
            return;
        }
        const collection = this.db.collection(generate_collection_name(id, type, asset, currency));
        collection.findOneAndReplace(condition, data, {upsert : true}, (err, res) => {
            if (err) throw err;
        })
    }
}

module.exports = Base_Manager;