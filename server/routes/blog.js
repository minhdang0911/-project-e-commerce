const router = require('express').Router();
const ctrls = require('../controller/blog');
const { verifyAccessToken, isAdmin } = require('../middlewares/verifyToken');

router.post('/', [verifyAccessToken, isAdmin], ctrls.createNewBlog);
router.put('/:bid', [verifyAccessToken, isAdmin], ctrls.updateBlog);

module.exports = router;
