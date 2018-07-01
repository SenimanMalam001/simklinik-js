const express = require('express');
const router = express.Router();
const { auth, otoritas} = require('../middlewares/auth')
const {  find, index, create, update, destroy} = require('../controllers/KasManualController')

router.get('/:id', auth,  find);
router.get('/', auth,  index);
router.post('/', auth,  create);
router.put('/:id', auth,  update);
router.delete('/:id', auth,  destroy);

module.exports = router;
