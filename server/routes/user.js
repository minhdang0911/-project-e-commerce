const router = require('express').Router();
const ctrls = require('../controller/user');
const { verifyAccessToken } = require('../middlewares/verifyToken');

router.post('/register', ctrls.register);
router.post('/login', ctrls.login);
router.get('/current', verifyAccessToken, ctrls.getCurrent);
router.post('/refreshToken', ctrls.refreshAccessToken);
router.get('/logout', ctrls.logout);
module.exports = router;
