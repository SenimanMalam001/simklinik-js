var express = require('express');
var router = express.Router();
const { auth, otoritas} = require('../middlewares/auth')
const { signin,index, create, update, destroy} = require('../controllers/UserController')

router.get('/', auth, otoritas, index);
router.post('/', auth, otoritas, create);
router.put('/:id', auth, otoritas, update);
router.delete('/:id', auth, otoritas, destroy);
router.post('/signin',signin);

module.exports = router;
