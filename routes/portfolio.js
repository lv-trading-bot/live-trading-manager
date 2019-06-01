var express = require('express');
var router = express.Router();
const {putPortfolio, getPortfolio} = require('../controllers/portfolio');

/* GET users listing. */
router.put('/', putPortfolio);

router.get('/', getPortfolio);

module.exports = router;
