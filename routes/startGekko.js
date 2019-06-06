var express = require('express');
var router = express.Router();
const {postStartGekko} = require('../controllers/startGekko');

/* GET users listing. */
router.post('/', postStartGekko);

module.exports = router;
