const express = require('express');
const router = express.Router();
const { auth, otoritas} = require('../middlewares/auth')
const { interval } = require('../controllers/PersediaanController')

router.get('/', auth,  interval);

module.exports = router;
