const router = require('express').Router();
const ctrls = require('../controller/user');
const { verifyAccessToken, isAdmin } = require('../middlewares/verifyToken');
const uploader = require('../config/cloudinary.config');

router.post('/register', ctrls.register);
router.put('/finalregister/:token', ctrls.finalregister);
router.post('/login', ctrls.login);
router.get('/current', verifyAccessToken, ctrls.getCurrent);
router.post('/refreshToken', ctrls.refreshAccessToken);
router.get('/logout', ctrls.logout);
router.post('/forgotpassword', ctrls.forgotPassword);
router.put('/resetpassord', ctrls.resetPassword);
router.get('/', [verifyAccessToken, isAdmin], ctrls.getUsers);
router.delete('/:uid', [verifyAccessToken, isAdmin], ctrls.deleteUser);
router.put('/current', [verifyAccessToken], uploader.single('avatar'), ctrls.UpdateUser);
router.put('/address', [verifyAccessToken, isAdmin], ctrls.updateUserAddress);
router.put('/cart', verifyAccessToken, ctrls.updateCart);
router.delete('/remove-cart/:pid', verifyAccessToken, ctrls.removeProductInCart);
router.put('/:uid', [verifyAccessToken, isAdmin], ctrls.updateUserByAdmin);

module.exports = router;
