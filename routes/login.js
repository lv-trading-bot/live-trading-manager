var express = require('express');
var router = express.Router();
const {postLogin} = require('../controllers/login');

/* GET users listing. */
router.post('/', postLogin);

module.exports = router;
