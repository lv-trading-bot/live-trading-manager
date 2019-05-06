var express = require('express');
var router = express.Router();
const {postReconnect} = require('../controllers/reconnect');

/* GET users listing. */
router.post('/', postReconnect);

module.exports = router;
