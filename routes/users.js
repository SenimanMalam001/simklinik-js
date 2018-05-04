var express = require('express');
var router = express.Router();
const { signin} = require('../controllers/UserController')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/signin',signin);

module.exports = router;
