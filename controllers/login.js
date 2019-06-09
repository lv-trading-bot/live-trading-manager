const {checkUiLogin} = require('../authentication/index');

const postLogin = (req, res, next) => {
    let username = req.body.username, 
        password = req.body.password;

    if(!username) {
        throw new Error("username is require");
    }

    if(!password) {
        throw new Error("password is require");
    }

    let result = checkUiLogin(username, password);

    if(!result.isValid) {
        res.status(400).send({error: result.errorMessage});
        return;
    } else {
        res.status(200).send({token: result.token});
    }
}

module.exports = {
    postLogin
}