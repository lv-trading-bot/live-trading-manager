var express = require('express');
var router = express.Router();
const {postAdvice} = require('../controllers/advice');

/* GET users listing. */
router.post('/', postAdvice);

module.exports = router;
