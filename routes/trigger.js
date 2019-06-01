var express = require('express');
var router = express.Router();
const {postTrigger, putTrigger, getTrigger} = require('../controllers/triggers');

/* GET users listing. */
router.post('/', postTrigger);
router.put('/', putTrigger);
router.get('/', getTrigger);

module.exports = router;
