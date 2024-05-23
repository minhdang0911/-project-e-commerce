const ProductCategory = require('../models/productCategory');
const asyncHandler = require('express-async-handler');

const createCategory = asyncHandler(async (req, res) => {
    const response = await ProductCategory.create(req.body);
    return res.status(200).json({
        success: response ? true : false,
        createdCategory: response ? response : 'Cannot create new product category',
    });
});

module.exports = {
    createCategory,
};
