const router = require('express').Router();
const ctrls = require('../controller/user');

router.post('/register', ctrls.register);
router.post('/login', ctrls.login);
module.exports = router;
