const _ = require('lodash');
const jwt = require('jsonwebtoken');
const moment = require('moment');

const uiAuthentication = (token) => {
    let result = {
        isValid: false,
        errorMessage: null
    }
    try {
        if (jwt.verify(token, secret)) {
            let decodeData = jwt.decode(token);
            let createAt = moment(decodeData.iat * 1000);
            if(createAt.add(time_live_of_token, 'millisecond').isAfter(moment())) {
                result.isValid = true;
                return result;
            } else {
                result.isValid = false;
                result.errorMessage = "The token was expire";
                return result;
            }
        }
    } catch (error) {
        result.isValid = false;
        result.errorMessage = "The sign of token is not valid";
        return result;
    }
}

let secret = "";
let time_live_of_token = 0;

// Check password and username
const checkUiLogin = (username, password) => {
    // Hỗ trợ cập nhật users mà k cần restart
    const info = require('./info');
    secret = info.secret_key;
    time_live_of_token = info.live_time_of_token;
    let user  = _.find(info.users, user => user.username === username);

    let result = {
        isValid: false,
        token: null,
        errorMessage: null
    }

    if (_.isEmpty(user)) {
        result.isValid = false;
        result.errorMessage = "User is not exits";
    } else if (user.password === password) {
        result.isValid = true;
        result.token = jwt.sign({username}, secret);
    } else {
        result.isValid = false;
        result.errorMessage = "Password is not match";
    }

    return result;
}

module.exports = {
    uiAuthentication,
    checkUiLogin
}