const express = require('express');
const router = express.Router();
const { auth, otoritas} = require('../middlewares/auth')
const { find, index, create, createCopy, update, destroy} = require('../controllers/KomisiController')

router.get('/',  index);
router.get('/:id', auth,  find);
router.post('/copy', auth,  createCopy);
router.post('/', auth,  create);
router.put('/:id', auth,  update);
router.delete('/:id', auth,  destroy);

module.exports = router;
