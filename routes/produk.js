const express = require('express');
const router = express.Router();
const { auth, otoritas} = require('../middlewares/auth')
const { cached } = require('../middlewares/redis')
const {  all, find, index, create,createProduk, update, destroy} = require('../controllers/ProdukController')

router.get('/', auth,  index);
router.get('/all', auth,  cached, all);
router.get('/:id', auth,  find);
router.post('/', auth,  create, createProduk);
router.put('/:id', auth,  update);
router.delete('/:id', auth,  destroy);

module.exports = router;
