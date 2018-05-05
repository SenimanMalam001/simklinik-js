const express = require('express');
const router = express.Router();
const { auth, otoritas} = require('../middlewares/auth')
const { index,  update} = require('../controllers/ProfilController')

router.get('/', auth, otoritas, index);
router.put('/', auth, otoritas, update);

module.exports = router;
