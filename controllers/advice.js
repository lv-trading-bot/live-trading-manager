const utils = require('../utils');
const axios = require('axios');
const moment = require('moment');
const log = require('../log');

const api = utils.getMachineLearningBaseApi() + utils.getMachineLearningApi().live;

var settingCaches = {

};

var caches = {};

const callPostAxios = (body) => {
    return new Promise((resolve, reject) => {
        axios.post(api, body)
        .then(result => {
            resolve({
                result: result.data.result
            })
        })
        .catch(err => {
            let errMess = err.response ? err.response.data : '' + err;
            log.warn('' + err);
            reject({
                result: 0,
                error: errMess
            });
        })
    })
}

// Chờ Nhân xong tính năng cho biết tỉ lệ thì sẽ phát triển thêm để can thiệp vào advice
const postAdvice = async (req, res, next) => {
    let body = req.body;
    
    // Save setting
    settingCaches[body.id] = body;

    res.setHeader("content-type", "json/text")
    try {
        res.end(JSON.stringify(await callPostAxios(body)));
    } catch (error) {
        res.end(JSON.stringify(error));
    }
}

module.exports = {
    postAdvice
}