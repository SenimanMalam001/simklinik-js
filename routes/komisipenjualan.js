const express = require('express');
const router = express.Router();
const { auth, otoritas} = require('../middlewares/auth')
const { interval, find, index, create, update, destroy} = require('../controllers/KomisiPenjualanController')

router.get('/interval', interval);
router.get('/', index);
router.get('/:id', auth,  find);
router.post('/', auth,  create);
router.put('/:id', auth,  update);
router.delete('/:id', auth,  destroy);

module.exports = router;
