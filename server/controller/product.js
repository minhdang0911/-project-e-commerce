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
    const product = await Product.findById(pid).populate({
        path: 'ratings',
        populate: {
            path: 'postedBy',
            select: 'firstname lastname avatar',
        },
    });

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

    // Chuyển đổi các giá trị price thành số
    if (formatedQueries.price) {
        if (formatedQueries.price.$gte !== undefined) formatedQueries.price.$gte = Number(formatedQueries.price.$gte);
        if (formatedQueries.price.$gt !== undefined) formatedQueries.price.$gt = Number(formatedQueries.price.$gt);
        if (formatedQueries.price.$lte !== undefined) formatedQueries.price.$lte = Number(formatedQueries.price.$lte);
        if (formatedQueries.price.$lt !== undefined) formatedQueries.price.$lt = Number(formatedQueries.price.$lt);
    }

    let colorQueryObj = {};

    // Filtering
    if (queries?.title) formatedQueries.title = { $regex: queries.title, $options: 'i' };
    if (queries?.category) formatedQueries.category = { $regex: queries.category, $options: 'i' };
    if (queries?.color) {
        delete formatedQueries.color;
        const colorArr = queries.color?.split(',');
        const colorQuery = colorArr.map((el) => ({ color: { $regex: el, $options: 'i' } }));
        colorQueryObj = { $or: colorQuery };
    }

    const q = { ...colorQueryObj, ...formatedQueries };
    let queryCommand = Product.find(q);

    // Sorting
    if (req.query.sort) {
        const sortBy = req.query.sort.split(',').join(' ');
        queryCommand = queryCommand.sort(sortBy);
    }

    //fields limitng
    if (req.query.fields) {
        const fields = req.query.fields.split(',').join(' ');
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
        const counts = await Product.countDocuments(q);
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

const Ratings = asyncHandler(async (req, res) => {
    const { _id } = req.user;
    const { star, comment, pid, updatedAt } = req.body;
    if (!star || !pid) throw new Error('Missing inputs');
    const ratingProduct = await Product.findById(pid);
    const alreadyRating = ratingProduct?.ratings?.find((el) => el.postedBy.toString() === _id);
    // console.log({ alreadyRating });
    if (alreadyRating) {
        //update star and comment
        await Product.updateOne(
            {
                ratings: { $elemMatch: alreadyRating },
            },
            {
                $set: { 'ratings.$.star': star, 'ratings.$.comment': comment, 'ratings.$.updatedAt': updatedAt },
            },
            { new: true },
        );
    } else {
        //add star and comment
        await Product.findByIdAndUpdate(
            pid,
            {
                $push: { ratings: { star, comment, postedBy: _id, updatedAt } },
            },
            { new: true },
        );
    }

    //sum ratings
    const updatedProduct = await Product.findById(pid);
    const ratingCount = updatedProduct.ratings.length;

    const sumRatings = updatedProduct.ratings.reduce((sum, el) => {
        return sum + +el.star;
    }, 0);

    updatedProduct.totalRatings = Math.round((sumRatings * 10) / ratingCount) / 10;
    await updatedProduct.save();

    return res.status(200).json({
        status: true,
        updatedProduct,
    });
});

const uploadImagesProduct = asyncHandler(async (req, res) => {
    const { pid } = req.params;
    if (!req.files) throw new Error('Missing inputs');
    const response = await Product.findByIdAndUpdate(
        pid,
        {
            $push: { image: { $each: req.files.map((el) => el.path) } },
        },
        { new: true },
    );
    console.log(response);
    return res.status(200).json({
        status: response ? true : false,
        updatedProduct: response ? response : 'Cannot upload image product',
    });
});

module.exports = {
    createProduct,
    getProduct,
    getProducts,
    updateProduct,
    deleteProduct,
    Ratings,
    uploadImagesProduct,
};
