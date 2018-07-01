const express = require('express');
const router = express.Router();
const { auth, otoritas} = require('../middlewares/auth')
const { all, index, create, update, destroy} = require('../controllers/RegistrasiController')

router.get('/all', auth, all);
router.get('/', auth, index);
router.post('/', auth,create);
router.put('/:id', auth, update);
router.delete('/:id', auth,  destroy);

module.exports = router;
