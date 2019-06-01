const utils = require('../utils');
const axios = require('axios');
const moment = require('moment');
const log = require('../log');
const { advice_manager, pair_control_manager } = require('../data_access_layer');
const {typeSystemAction, emitEvent} = require('../socket');

const api = utils.getMachineLearningBaseApi() + utils.getMachineLearningApi().live;

var settingCaches = {

};

var caches = {};

const callPostAxios = (body) => {
    return new Promise((resolve, reject) => {
        axios.post(api, body)
            .then(result => {
                advice_manager.write(body.id, body.asset, body.currency, {at: moment().utc().toISOString(), body, result: result.data.result });
                resolve({
                    result: result.data.result
                })
            })
            .catch(err => {
                let errMess = err.response ? err.response.data : '' + err;
                log.warn(err);
                advice_manager.write(body.id, body.asset, body.currency, {at: moment().utc().toISOString(), body, errMess });
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

    let id = req.body.id;
    let asset = req.body.asset;
    let currency = req.body.currency;

    try {
        if (!id) {
            throw new Error("Thiếu id");
        }
        if (!asset) {
            throw new Error("Thiếu asset");
        }
        if (!currency) {
            throw new Error("Thiếu currency");
        }
    } catch (error) {
        res.locals.message = error.message;
        res.locals.error = req.app.get('env') === 'development' ? error : {};

        // render the error page
        res.status(error.status || 500);
        res.render('error');
        return;
    }

    // Save setting
    settingCaches[body.id] = body;

    emitEvent(typeSystemAction.ON_POST_ADVICE, {asset, currency, id});
    
    res.setHeader("content-type", "json/text");

    let resultsPairControl = await pair_control_manager.read({id});

    let accept_buy = true;

    if(resultsPairControl && resultsPairControl.length > 0) {
        accept_buy = resultsPairControl[0].accept_buy;
    }

    if(!accept_buy) {
        res.end(JSON.stringify({result: 0}));
        return;
    }

    try {
        res.end(JSON.stringify(await callPostAxios(body)));
    } catch (error) {
        res.end(JSON.stringify(error));
    }
}

const getAdvice = function (req, res, next) {
    let id = req.query.id;
    let asset = req.query.asset;
    let currency = req.query.currency;

    if (!id) {
        throw new Error("Thiếu id");
    }
    if (!asset) {
        throw new Error("Thiếu asset");
    }
    if (!currency) {
        throw new Error("Thiếu currency");
    }

    let condition, sort, limit, page;
    try {
        condition = req.query.condition ? JSON.parse(req.query.condition) : undefined;
    } catch (error) {
        log.warn(error);
        condition = undefined;
    }

    try {
        sort = req.query.sort ? JSON.parse(req.query.sort) : undefined;
    } catch (error) {
        log.warn(error);
        sort = undefined;
    }

    try {
        limit = req.query.limit ? parseInt(req.query.limit) : undefined;
        if (isNaN(limit)) {
            limit = undefined;
        }
    } catch (error) {
        log.warn(error);
        limit = undefined;
    }

    try {
        page = req.query.page ? parseInt(req.query.page) : undefined;
        if (isNaN(page)) {
            page = undefined;
        }
    } catch (error) {
        log.warn(error);
        page = undefined;
    }

    if (page !== undefined && limit === undefined) {
        throw new Error("Page work with limit!");
    }

    advice_manager.read(id, asset, currency, condition, sort, limit, page)
        .then(arrayAdvide => {
            res.setHeader('content-type', 'json/text')
            res.end(JSON.stringify(arrayAdvide));
        })
        .catch(err => {
            log.warn(err);
            throw err;
        })
}

module.exports = {
    postAdvice,
    getAdvice
}