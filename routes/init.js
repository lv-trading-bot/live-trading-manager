var express = require('express');
var router = express.Router();
const {getInit} = require('../controllers/init');

/* GET users listing. */
router.get('/', getInit);

module.exports = router;
