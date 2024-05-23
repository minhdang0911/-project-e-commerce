const Product = require('../models/product');
const asyncHandler = require('express-async-handler');
const slugify = require('slugify');

const createProduct = asyncHandler(async (req, res) => {
    if (Object.keys(req.body).length === 0) throw new Error('Missing input');
    if (req.body && req.body.title) req.body.slug = slugify(req.body.title); // sửa lại 'tile' thành 'title'
    const newProduct = await Product.create(req.body);
    return res.status(200).json({
        success: newProduct ? true : false,
        createdProduct: newProduct ? newProduct : `can't create new product`,
    });
});

const getProduct = asyncHandler(async (req, res) => {
    const { pid } = req.params;
    const product = await Product.findById(pid);

    return res.status(200).json({
        success: product ? true : false,
        productData: product ? product : `can't get new product`,
    });
});

const getProducts = asyncHandler(async (req, res) => {
    const queries = { ...req.query };

    // Tách những trường này ra khỏi query
    const exclude = ['limit', 'sort', 'page', 'fields'];
    exclude.forEach((el) => delete queries[el]);

    // Format các operators cho đúng cú pháp Mongoose
    let queryString = JSON.stringify(queries);
    queryString = queryString.replace(/\b(gte|gt|lt|lte)\b/g, (matchedEl) => `$${matchedEl}`);
    const formatedQueries = JSON.parse(queryString);

    // Filtering
    if (queries?.title) formatedQueries.title = { $regex: queries.title, $options: 'i' };
    if (queries?.price) formatedQueries.price = Number(queries.price);
    let queryCommand = Product.find(formatedQueries);

    // Sorting
    if (req.query.sort) {
        const sortBy = req.query.sort.split(',').join(' ');
        queryCommand = queryCommand.sort(sortBy);
    }

    //fields limitng
    if (req.query.fields) {
        const fields = +req.query.fields.split(',').join(' ');
        queryCommand = queryCommand.select(fields);
    }

    //pagination
    const page = +req.query.page || 1;
    const limit = +req.query.limit || process.env.LIMIT_PRODUCT;
    const skip = (page - 1) * limit;
    queryCommand.skip(skip).limit(limit);
    try {
        // Execute query
        const response = await queryCommand;
        const counts = await Product.countDocuments(formatedQueries);
        return res.status(200).json({
            success: response.length > 0,
            products: response,
            counts,
        });
    } catch (err) {
        return res.status(500).json({ success: false, message: err.message });
    }
});

const updateProduct = asyncHandler(async (req, res) => {
    const { pid } = req.params;
    if (req.body && req.body.title) req.body.slug = slugify(req.body.title);
    const updatedProduct = await Product.findByIdAndUpdate(pid, req.body);
    return res.status(200).json({
        success: updatedProduct ? true : false,
        productDatas: updatedProduct ? updatedProduct : `can't update new product`,
    });
});

const deleteProduct = asyncHandler(async (req, res) => {
    const { pid } = req.params;
    const deleteProduct = await Product.findByIdAndDelete(pid);
    return res.status(200).json({
        success: deleteProduct ? true : false,
        productDatas: deleteProduct ? deleteProduct : `can't delete new product`,
    });
});

module.exports = {
    createProduct,
    getProduct,
    getProducts,
    updateProduct,
    deleteProduct,
};
