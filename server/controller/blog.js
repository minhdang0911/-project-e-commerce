const Blog = require('../models/blog');
const asyncHandler = require('express-async-handler');

const createNewBlog = asyncHandler(async (req, res) => {
    const { title, description, category } = req.body;
    if (!title || !description || !category) throw new Error('Missing inputs');
    const response = await Blog.create(req.body);
    return res.status(200).json({
        success: response ? true : false,
        createdBlog: response ? response : 'Cannot create new blogs ',
    });
});

const updateBlog = asyncHandler(async (req, res) => {
    const { bid } = req.params;
    if (Object.keys(req.body).length === 0) throw new Error('Missing inputs');
    const response = await Blog.findByIdAndUpdate(bid, req.body, { new: true });
    return res.status(200).json({
        success: response ? true : false,
        updatedBlog: response ? response : 'Cannot update new blogs ',
    });
});

const getBlogs = asyncHandler(async (req, res) => {
    const response = await Blog.find();
    return res.status(200).json({
        success: response ? true : false,
        Blogs: response ? response : 'Cannot get blogs ',
    });
});

const likeBlog = asyncHandler(async (req, res) => {
    const { _id } = req.user;
    const { bid } = req.params;
    if (!bid) throw new Error('Missing inputs');
    const blog = await Blog.findById(bid);
    const alreadyDisliked = blog?.dislikes?.find((el) => el.toString() === _id);
    if (alreadyDisliked) {
        const response = await Blog.findByIdAndUpdate(bid, { $pull: { dislikes: _id } }, { new: true });
        return res.status(200).json({
            success: response ? true : false,
            rs: response,
        });
    }
    const isLiked = blog?.likes?.find((el) => el.toString() === _id);
    if (isLiked) {
        const response = await Blog.findByIdAndUpdate(bid, { $pull: { likes: _id } }, { new: true });
        return res.status(200).json({
            success: response ? true : false,
            rs: response,
        });
    } else {
        const response = await Blog.findByIdAndUpdate(bid, { $push: { likes: _id } }, { new: true });
        return res.status(200).json({
            success: response ? true : false,
            rs: response,
        });
    }
});

const dislikeBlog = asyncHandler(async (req, res) => {
    const { _id } = req.user;
    const { bid } = req.params;
    if (!bid) throw new Error('Missing inputs');
    const blog = await Blog.findById(bid);
    const alreadyliked = blog?.likes?.find((el) => el.toString() === _id);
    if (alreadyliked) {
        const response = await Blog.findByIdAndUpdate(bid, { $pull: { likes: _id } }, { new: true });
        return res.status(200).json({
            success: response ? true : false,
            rs: response,
        });
    }
    const isDisliked = blog?.dislikes?.find((el) => el.toString() === _id);
    if (isDisliked) {
        const response = await Blog.findByIdAndUpdate(bid, { $pull: { dislikes: _id } }, { new: true });
        return res.status(200).json({
            success: response ? true : false,
            rs: response,
        });
    } else {
        const response = await Blog.findByIdAndUpdate(bid, { $push: { dislikes: _id } }, { new: true });
        return res.status(200).json({
            success: response ? true : false,
            rs: response,
        });
    }
});

module.exports = {
    createNewBlog,
    updateBlog,
    getBlogs,
    likeBlog,
    dislikeBlog,
};
