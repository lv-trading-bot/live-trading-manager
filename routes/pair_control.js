var express = require('express');
var router = express.Router();
const {putPairControl, getPairControl} = require('../controllers/pair_control');

/* GET users listing. */
router.put('/', putPairControl);

router.get('/', getPairControl);

module.exports = router;
