const utils = require('../utils');
const axios = require('axios');
const moment = require('moment');
const log = require('../log');

const api = utils.getGekkoIgniterBaseApi() + utils.getGekkoIgniterApi().startGekko;

const callPostAxios = (body) => {
    return new Promise((resolve, reject) => {
        axios.post(api, body)
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

const postStartGekko = async (req, res, next) => {
    try {
        res.send(await callPostAxios(req.body));
    } catch (error) {
        res.send({error});
    }
}

module.exports = {
    postStartGekko
}