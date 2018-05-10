var express = require('express');
var router = express.Router();
const { auth, otoritas} = require('../middlewares/auth')
const { all, signin, index, create, update, destroy, find} = require('../controllers/UserController')

router.get('/', auth, otoritas, index);
router.get('/all', auth, otoritas, all);
router.get('/:id', auth, otoritas, find);
router.post('/', auth, otoritas, create);
router.put('/:id', auth, otoritas, update);
router.delete('/:id', auth, otoritas, destroy);
router.post('/signin',signin);

module.exports = router;
