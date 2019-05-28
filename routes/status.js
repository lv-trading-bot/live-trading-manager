var express = require('express');
var router = express.Router();
const {getStatus} = require('../controllers/status');

/* GET users listing. */
router.get('/', getStatus);

module.exports = router;
