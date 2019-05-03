var express = require('express');
var router = express.Router();
const {postTrigger, putTrigger} = require('../controllers/triggers');

/* GET users listing. */
router.post('/', postTrigger);
router.put('/', putTrigger);

module.exports = router;
