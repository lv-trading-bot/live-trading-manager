var express = require('express');
var router = express.Router();
const {postAdvice, getAdvice} = require('../controllers/advice');

/* GET users listing. */
router.post('/', postAdvice);
router.get('/', getAdvice);

module.exports = router;
