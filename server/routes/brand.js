const router = require('express').Router();
const ctrls = require('../controller/brand');
const { verifyAccessToken, isAdmin } = require('../middlewares/verifyToken');
router.post('/', [verifyAccessToken, isAdmin], ctrls.createNewBrand);
router.get('/', ctrls.getBrand);
router.put('/:bid', [verifyAccessToken, isAdmin], ctrls.updatedBrand);
router.delete('/:bid', [verifyAccessToken, isAdmin], ctrls.deleteBrand);

module.exports = router;
