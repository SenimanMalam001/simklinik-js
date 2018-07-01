const express = require('express');
const router = express.Router();
const { auth, otoritas} = require('../middlewares/auth')
const { interval } = require('../controllers/TransaksiKasController')

router.get('/', auth, interval);

module.exports = router;
