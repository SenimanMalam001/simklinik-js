const express = require('express');
const router = express.Router();
const { auth, otoritas} = require('../middlewares/auth')
const { index, create, update, destroy} = require('../controllers/KategoriProdukController')

router.get('/', auth,  index);
router.post('/', auth,  create);
router.put('/:id', auth,  update);
router.delete('/:id', auth,  destroy);

module.exports = router;
