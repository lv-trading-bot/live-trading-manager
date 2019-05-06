var express = require('express');
var router = express.Router();
const {postTrade} = require('../controllers/trade');

/* GET users listing. */
router.post('/', postTrade);

module.exports = router;
