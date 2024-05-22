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
    const products = await Product.find();
    return res.status(200).json({
        success: products ? true : false,
        productData: products ? products : `can't get new product`,
    });
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
