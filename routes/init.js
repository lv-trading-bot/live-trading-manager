var express = require('express');
var router = express.Router();
const {postInit} = require('../controllers/init');

/* GET users listing. */
router.post('/', postInit);

module.exports = router;
