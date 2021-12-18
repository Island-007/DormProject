const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth')

router.use('/users', require('./users'));
router.use('/user', auth, require('./user'));
router.use('/menu', auth, require('./menu'));
router.use('/building', auth, require('./building'));
router.use('/notice', auth, require('./notice'));
router.use('/service', auth, require('./service'));
router.use('/room', auth, require('./room'));
router.use('/apply', auth, require('./apply'));


module.exports = router;
