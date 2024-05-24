const router = require('express').Router();
const ctrls = require('../controller/order');
const { verifyAccessToken, isAdmin } = require('../middlewares/verifyToken');

router.post('/', verifyAccessToken, ctrls.createOrder);

router.get('/', verifyAccessToken, ctrls.getUserOrder);
router.get('/admin', verifyAccessToken, isAdmin, ctrls.getAllOrder);
router.put('/status/:oid', verifyAccessToken, isAdmin, ctrls.updateStatusOrder);

module.exports = router;
