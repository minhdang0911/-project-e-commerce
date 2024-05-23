const BlogCategory = require('../models/blogCategory');
const asyncHandler = require('express-async-handler');

const createCategory = asyncHandler(async (req, res) => {
    const response = await BlogCategory.create(req.body);
    return res.status(200).json({
        success: response ? true : false,
        createdCategory: response ? response : 'Cannot create new blogs category',
    });
});

const getCategories = asyncHandler(async (req, res) => {
    const response = await BlogCategory.find().select('title _id');
    return res.status(200).json({
        success: response ? true : false,
        blogCategories: response ? response : 'Cannot get new blogs category',
    });
});

const updateCategory = asyncHandler(async (req, res) => {
    const { pcid } = req.params;
    const response = await BlogCategory.findByIdAndUpdate(pcid, req.body, { new: true });
    return res.status(200).json({
        success: response ? true : false,
        updatedblogCategory: response ? response : 'Cannot update  blogs category',
    });
});

const deleteCategory = asyncHandler(async (req, res) => {
    const { pcid } = req.params;
    const response = await BlogCategory.findByIdAndDelete(pcid);
    return res.status(200).json({
        success: response ? true : false,
        deletedblogCategory: response ? response : 'Cannot delete  blogs category',
    });
});

module.exports = {
    createCategory,
    getCategories,
    updateCategory,
    deleteCategory,
};
