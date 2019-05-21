var express = require('express');
var router = express.Router();
const {postTrade, getTrade} = require('../controllers/trade');

/* GET users listing. */
router.post('/', postTrade);
router.get('/', getTrade);

module.exports = router;
