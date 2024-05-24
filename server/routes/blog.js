const router = require('express').Router();
const ctrls = require('../controller/blog');
const { verifyAccessToken, isAdmin } = require('../middlewares/verifyToken');
const uploader = require('../config/cloudinary.config');

router.post('/', [verifyAccessToken, isAdmin], ctrls.createNewBlog);
router.get('/', ctrls.getBlogs);

router.put('/like/:bid', [verifyAccessToken], ctrls.likeBlog);
router.put('/dislike/:bid', [verifyAccessToken], ctrls.dislikeBlog);
router.put('/:bid', [verifyAccessToken, isAdmin], ctrls.updateBlog);
router.delete('/:bid', [verifyAccessToken, isAdmin], ctrls.DeleteBlog);
router.get('/one/:bid', ctrls.getBlog);
router.put('/uploadImage/:bid', [verifyAccessToken, isAdmin], uploader.single('image'), ctrls.uploadImagesBlog);

module.exports = router;
