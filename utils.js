const configName = "config";

class Utils {
    constructor() {
        this.config = false;
    }
    /**
     * @param {Number} milisecond 
     */
    wait(milisecond) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve();
            }, milisecond);
        })
    }


    getConfig() {
        if (!this.config) {
            this.config = (require('./' + configName));
        }
        return this.config;
    }

    getConnectionString() {
        return this.getConfig().mongodb.connectionString;
    }

    getDbName() {
        return this.getConfig().mongodb.dbName;
    }

    getMachineLearningApi() {
        return this.getConfig().machine_learning_api;
    }

    getMachineLearningBaseApi() {
        return this.getConfig().machine_learning_api.base;
    }
}

module.exports = (new Utils());