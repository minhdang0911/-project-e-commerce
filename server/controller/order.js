const Order = require('../models/order');
const User = require('../models/user');
const Coupon = require('../models/coupon');
const asyncHandler = require('express-async-handler');

const createOrder = asyncHandler(async (req, res) => {
    const { _id } = req.user;
    const { products, total, address, status } = req.body;
    if (address) {
        await User.findByIdAndUpdate(_id, { address });
    }
    const data = { products, total, orderBy: _id };
    if (status) data.status = status;
    const rs = await Order.create(data);
    return res.status(200).json({
        success: rs ? true : false,
        rs: rs ? rs : 'Something went wrong',
    });
    // const userCart = await User.findById(_id).select('cart').populate('cart.product', 'title price');

    // const products = userCart?.cart?.map((el) => ({
    //     product: el.product._id,
    //     count: el.quantity,
    //     color: el.color,
    // }));

    // let total = userCart?.cart?.reduce((sum, el) => {
    //     return sum + el.product.price * el.quantity;
    // }, 0);

    // const createData = { products, total, orderBy: _id };

    // if (coupon) {
    //     const selectedCoupon = await Coupon.findById(coupon);
    //     total = Math.round((total * (1 - +selectedCoupon?.discount / 100)) / 1000) * 1000 || total;
    //     createData.total = total;
    //     createData.coupon = coupon;
    // }
});

const updateStatusOrder = asyncHandler(async (req, res) => {
    const { oid } = req.params;
    const { status } = req.body;
    if (!status) throw new Error('Missing status');

    const response = await Order.findByIdAndUpdate(oid, { status }, { new: true });

    return res.status(200).json({
        success: response ? true : false,
        createdBrand: response ? response : 'Something went wrong',
    });
});

// const getUserOrder = asyncHandler(async (req, res) => {
//     const { _id } = req.user;
//     const response = await Order.find({ orderBy: _id });
//     return res.status(200).json({
//         success: response ? true : false,
//         response: response ? response : 'Something went wrong',
//     });
// });

const getUserOrder = asyncHandler(async (req, res) => {
    const queries = { ...req.query };
    const { _id } = req.user;

    const exclude = ['limit', 'sort', 'page', 'fields'];
    exclude.forEach((el) => delete queries[el]);

    let queryString = JSON.stringify(queries);
    queryString = queryString.replace(/\b(gte|gt|lt|lte)\b/g, (matchedEl) => `$${matchedEl}`);
    const formatedQueries = JSON.parse(queryString);

    if (formatedQueries.price) {
        if (formatedQueries.price.$gte !== undefined) formatedQueries.price.$gte = Number(formatedQueries.price.$gte);
        if (formatedQueries.price.$gt !== undefined) formatedQueries.price.$gt = Number(formatedQueries.price.$gt);
        if (formatedQueries.price.$lte !== undefined) formatedQueries.price.$lte = Number(formatedQueries.price.$lte);
        if (formatedQueries.price.$lt !== undefined) formatedQueries.price.$lt = Number(formatedQueries.price.$lt);
    }

    let colorQueryObj = {};

    // if (queries?.title) formatedQueries.title = { $regex: queries.title, $options: 'i' };
    // if (queries?.category) formatedQueries.category = { $regex: queries.category, $options: 'i' };
    // if (queries?.color) {
    //     delete formatedQueries.color;
    //     const colorArr = queries.color?.split(',');
    //     const colorQuery = colorArr.map((el) => ({ color: { $regex: el, $options: 'i' } }));
    //     colorQueryObj = { $or: colorQuery };
    // }

    // let queryObject = {};

    // if (queries?.q) {
    //     delete formatedQueries.q;
    //     queryObject = {
    //         $or: [
    //             { color: { $regex: queries.q, $options: 'i' } },
    //             { title: { $regex: queries.q, $options: 'i' } },
    //             { category: { $regex: queries.q, $options: 'i' } },
    //             { brand: { $regex: queries.q, $options: 'i' } },
    //         ],
    //     };
    // }

    const qr = { ...formatedQueries, orderBy: _id };
    let queryCommand = Order.find(qr);

    if (req.query.sort) {
        const sortBy = req.query.sort.split(',').join(' ');
        queryCommand = queryCommand.sort(sortBy);
    }

    if (req.query.fields) {
        const fields = req.query.fields.split(',').join(' ');
        queryCommand = queryCommand.select(fields);
    }

    const page = +req.query.page || 1;
    const limit = +req.query.limit || process.env.LIMIT_PRODUCT;
    const skip = (page - 1) * limit;
    queryCommand.skip(skip).limit(limit);

    try {
        const response = await queryCommand;
        const counts = await Order.countDocuments(qr);

        // Thêm thuộc tính originalSerialNumber cho từng sản phẩm
        const productsWithSerialNumbers = response.map((product, index) => ({
            ...product.toObject(),
            originalSerialNumber: skip + index + 1,
        }));

        return res.status(200).json({
            success: productsWithSerialNumbers.length > 0,
            products: productsWithSerialNumbers,
            counts,
        });
    } catch (err) {
        return res.status(500).json({ success: false, message: err.message });
    }
});

const getAllOrder = asyncHandler(async (req, res) => {
    const queries = { ...req.query };

    const exclude = ['limit', 'sort', 'page', 'fields'];
    exclude.forEach((el) => delete queries[el]);

    let queryString = JSON.stringify(queries);
    queryString = queryString.replace(/\b(gte|gt|lt|lte)\b/g, (matchedEl) => `$${matchedEl}`);
    const formatedQueries = JSON.parse(queryString);

    if (formatedQueries.price) {
        if (formatedQueries.price.$gte !== undefined) formatedQueries.price.$gte = Number(formatedQueries.price.$gte);
        if (formatedQueries.price.$gt !== undefined) formatedQueries.price.$gt = Number(formatedQueries.price.$gt);
        if (formatedQueries.price.$lte !== undefined) formatedQueries.price.$lte = Number(formatedQueries.price.$lte);
        if (formatedQueries.price.$lt !== undefined) formatedQueries.price.$lt = Number(formatedQueries.price.$lt);
    }

    let colorQueryObj = {};

    // if (queries?.title) formatedQueries.title = { $regex: queries.title, $options: 'i' };
    // if (queries?.category) formatedQueries.category = { $regex: queries.category, $options: 'i' };
    // if (queries?.color) {
    //     delete formatedQueries.color;
    //     const colorArr = queries.color?.split(',');
    //     const colorQuery = colorArr.map((el) => ({ color: { $regex: el, $options: 'i' } }));
    //     colorQueryObj = { $or: colorQuery };
    // }

    // let queryObject = {};

    // if (queries?.q) {
    //     delete formatedQueries.q;
    //     queryObject = {
    //         $or: [
    //             { color: { $regex: queries.q, $options: 'i' } },
    //             { title: { $regex: queries.q, $options: 'i' } },
    //             { category: { $regex: queries.q, $options: 'i' } },
    //             { brand: { $regex: queries.q, $options: 'i' } },
    //         ],
    //     };
    // }

    const qr = { ...formatedQueries };
    let queryCommand = Order.find(qr);

    if (req.query.sort) {
        const sortBy = req.query.sort.split(',').join(' ');
        queryCommand = queryCommand.sort(sortBy);
    }

    if (req.query.fields) {
        const fields = req.query.fields.split(',').join(' ');
        queryCommand = queryCommand.select(fields);
    }

    const page = +req.query.page || 1;
    const limit = +req.query.limit || process.env.LIMIT_PRODUCT;
    const skip = (page - 1) * limit;
    queryCommand.skip(skip).limit(limit);

    try {
        const response = await queryCommand;
        const counts = await Order.countDocuments(qr);

        // Thêm thuộc tính originalSerialNumber cho từng sản phẩm
        const productsWithSerialNumbers = response.map((product, index) => ({
            ...product.toObject(),
            originalSerialNumber: skip + index + 1,
        }));

        return res.status(200).json({
            success: productsWithSerialNumbers.length > 0,
            products: productsWithSerialNumbers,
            counts,
        });
    } catch (err) {
        return res.status(500).json({ success: false, message: err.message });
    }
});

module.exports = {
    createOrder,
    updateStatusOrder,
    getUserOrder,
    getAllOrder,
};
