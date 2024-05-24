const router = require('express').Router();
const ctrls = require('../controller/order');
const { verifyAccessToken, isAdmin } = require('../middlewares/verifyToken');

router.post('/', verifyAccessToken, ctrls.createOrder);

module.exports = router;
