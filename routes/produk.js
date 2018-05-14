const express = require('express');
const router = express.Router();
const { auth, otoritas} = require('../middlewares/auth')
const { cached } = require('../middlewares/redis')
const {  all, find, index, create, update, destroy} = require('../controllers/ProdukController')

router.get('/all', auth, otoritas, cached, all);
router.get('/:id', auth, otoritas, find);
router.get('/', auth, otoritas, index);
router.post('/', auth, otoritas, create);
router.put('/:id', auth, otoritas, update);
router.delete('/:id', auth, otoritas, destroy);

module.exports = router;
