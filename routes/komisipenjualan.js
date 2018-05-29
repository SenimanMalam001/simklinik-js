const express = require('express');
const router = express.Router();
const { auth, otoritas} = require('../middlewares/auth')
const { interval, find, index, create, update, destroy} = require('../controllers/KomisiPenjualanController')

router.get('/interval', interval);
router.get('/', index);
router.get('/:id', auth, otoritas, find);
router.post('/', auth, otoritas, create);
router.put('/:id', auth, otoritas, update);
router.delete('/:id', auth, otoritas, destroy);

module.exports = router;
