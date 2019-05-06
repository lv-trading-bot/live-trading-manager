var express = require('express');
var router = express.Router();
const {putPortfolio} = require('../controllers/portfolio');

/* GET users listing. */
router.put('/', putPortfolio);

module.exports = router;
