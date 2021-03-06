const express = require('express');
const router = express.Router();
const { auth, otoritas} = require('../middlewares/auth')
const { all, find, index, create, update, destroy} = require('../controllers/PenjaminController')

router.get('/all', auth, all);
router.get('/:id', auth, find);
router.get('/', auth, index);
router.post('/', auth, create);
router.put('/:id', auth, update);
router.delete('/:id', auth, destroy);

module.exports = router;
