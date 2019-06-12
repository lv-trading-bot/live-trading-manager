const utils = require('../utils');
const axios = require('axios');
const moment = require('moment');
const log = require('../log');

const api = utils.getGekkoIgniterBaseApi() + utils.getGekkoIgniterApi().backtest;

const callPostAxios = (body) => {
    return new Promise((resolve, reject) => {
        axios.post(api, body, {timeout: 1000 * 60 * 60 * 24})
            .then(result => {
                resolve(result.data);
            })
            .catch(err => {
                let errMess = err.response ? err.response.data : '' + err;
                log.warn(err);
                reject(errMess);
            })
    })
}

const postBacktest = async (req, res, next) => {
    try {
        res.send(await callPostAxios(req.body));
    } catch (error) {
        res.send({error});
    }
}

module.exports = {
    postBacktest
}