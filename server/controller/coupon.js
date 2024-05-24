const Coupon = require('../models/coupon');
const asyncHandler = require('express-async-handler');

const createNewCoupon = asyncHandler(async (req, res) => {
    const { name, discount, expiry } = req.body;
    if (!name || !discount || !expiry) throw new Error('Missing inputs');

    const expiryDate = new Date(Date.now() + expiry * 24 * 60 * 60 * 1000);

    const response = await Coupon.create({
        ...req.body,
        expiry: expiryDate,
    });

    return res.status(200).json({
        success: !!response,
        createdCoupon: response || 'Cannot create new coupon',
    });
});

const getCoupon = asyncHandler(async (req, res) => {
    const response = await Coupon.find().select('-createdAt -updatedAt');

    return res.status(200).json({
        success: !!response,
        Coupon: response || 'Cannot get new coupon',
    });
});

const UpdateCoupon = asyncHandler(async (req, res) => {
    const { cid } = req.params;

    if (Object.keys(req.body).length === 0) throw new Error('Missing input');

    if (req.body.expiry) req.body.expiry = new Date(Date.now() + req.body.expiry * 24 * 60 * 60 * 1000);

    const response = await Coupon.findByIdAndUpdate(cid, req.body, { new: true });

    return res.status(200).json({
        success: response ? true : false,
        updatedCoupon: response || 'Cannot update new coupon',
    });
});

const deleteCoupon = asyncHandler(async (req, res) => {
    const { cid } = req.params;

    const response = await Coupon.findByIdAndDelete(cid);

    return res.status(200).json({
        success: response ? true : false,
        deleteCoupon: response || 'Cannot delete new coupon',
    });
});

module.exports = {
    createNewCoupon,
    getCoupon,
    UpdateCoupon,
    deleteCoupon,
};
