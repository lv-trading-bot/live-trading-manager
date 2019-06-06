var express = require('express');
var router = express.Router();
const {postStopGekko} = require('../controllers/stopGekko');

/* GET users listing. */
router.post('/', postStopGekko);

module.exports = router;
