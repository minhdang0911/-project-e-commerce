const Order = require('../models/order');
const User = require('../models/user');
const asyncHandler = require('express-async-handler');

const createOrder = asyncHandler(async (req, res) => {
    const { _id } = req.user;
    const { coupon } = req.body;
    const userCart = await User.findById(_id).select('cart').populate('cart.product', 'title price');

    const products = userCart?.cart?.map((el) => ({
        product: el.product._id,
        count: el.quantity,
        color: el.color,
    }));

    let total = userCart?.cart?.reduce((sum, el) => {
        return sum + el.product.price * el.quantity;
    }, 0);

    if (coupon) {
        total = Math.round((total * (1 - coupon / 100)) / 1000) * 1000;
    }

    const rs = await Order.create({ products, total, orderBy: _id });

    return res.status(200).json({
        success: rs ? true : false,
        createdBrand: rs ? rs : 'Something went wrong',
    });
});

module.exports = {
    createOrder,
};
