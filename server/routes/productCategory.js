const router = require('express').Router();
const ctrls = require('../controller/productCategory');
const { verifyAccessToken, isAdmin } = require('../middlewares/verifyToken');
router.post('/', [verifyAccessToken, isAdmin], ctrls.createCategory);

module.exports = router;
