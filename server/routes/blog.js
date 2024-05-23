const router = require('express').Router();
const ctrls = require('../controller/blog');
const { verifyAccessToken, isAdmin } = require('../middlewares/verifyToken');

router.post('/', [verifyAccessToken, isAdmin], ctrls.createNewBlog);
router.get('/', ctrls.getBlogs);
router.put('/like', [verifyAccessToken], ctrls.likeBlog);
router.put('/:bid', [verifyAccessToken, isAdmin], ctrls.updateBlog);

module.exports = router;
