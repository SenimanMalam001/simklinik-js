const express = require('express');
const router = express.Router();
const { auth, otoritas} = require('../middlewares/auth')
const { find, index, create, update, destroy} = require('../controllers/KasController')

router.get('/:id', auth, otoritas, find);
router.get('/', auth, otoritas, index);
router.post('/', auth, otoritas, create);
router.put('/:id', auth, otoritas, update);
router.delete('/:id', auth, otoritas, destroy);

module.exports = router;
