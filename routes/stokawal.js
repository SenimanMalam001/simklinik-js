const express = require('express');
const router = express.Router();
const { auth, otoritas} = require('../middlewares/auth')
const {  createStokAwal,find, index, create, update, destroy} = require('../controllers/StokAwalController')

router.get('/:id', auth, otoritas, find);
router.get('/', auth, otoritas, index);
router.post('/', auth, otoritas, create, createStokAwal);
router.put('/:id', auth, otoritas, update);
router.delete('/:id', auth, otoritas, destroy);

module.exports = router;
