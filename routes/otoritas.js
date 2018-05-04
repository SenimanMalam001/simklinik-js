const express = require('express');
const router = express.Router();
const { auth, otoritas} = require('../middlewares/auth')
const { index, getOtoritasUser, updateOtoritasUser } = require('../controllers/OtoritasController')

router.get('/', auth, otoritas, index);
router.get('/user/:id', auth, otoritas, getOtoritasUser);
router.put('/user/:id', auth, otoritas, updateOtoritasUser);

module.exports = router;
