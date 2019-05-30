var express = require('express');
var router = express.Router();
const {getConfig} = require('../controllers/config');

/* GET users listing. */
router.get('/', getConfig);

module.exports = router;
