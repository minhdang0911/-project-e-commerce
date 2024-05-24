const router = require('express').Router();
const ctrls = require('../controller/coupon');
const { verifyAccessToken, isAdmin } = require('../middlewares/verifyToken');

router.post('/', [verifyAccessToken, isAdmin], ctrls.createNewCoupon);
router.get('/', ctrls.getCoupon);
router.put('/:cid', [verifyAccessToken, isAdmin], ctrls.UpdateCoupon);
router.delete('/:cid', [verifyAccessToken, isAdmin], ctrls.deleteCoupon);
module.exports = router;
