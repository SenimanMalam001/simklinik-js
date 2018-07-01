const express = require('express');
const router = express.Router();
const { auth, otoritas} = require('../middlewares/auth')
const { index,  update} = require('../controllers/ProfilController')

router.get('/', index);
router.put('/:id', auth,  update);

module.exports = router;
