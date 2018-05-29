const express = require('express');
const router = express.Router();
const { auth, otoritas} = require('../middlewares/auth')
const { all, index, create, update, destroy} = require('../controllers/RegistrasiController')

router.get('/all', auth, otoritas, all);
router.get('/', auth, otoritas, index);
router.post('/', auth, otoritas,create);
router.put('/:id', auth, otoritas, update);
router.delete('/:id', auth, otoritas,  destroy);

module.exports = router;
