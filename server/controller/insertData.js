const Product = require('../models/product');
const Category = require('../models/productCategory');
const asyncHandler = require('express-async-handler');
const data = require('../data/data5.json');
const slugify = require('slugify');
const dataCate = require('../data/cate_brand');

const fn = async (product) => {
    await Product.create({
        title: product?.name,
        slug: slugify(product?.name) + Math.round(Math.random() * 100) + '',
        description: product?.description,
        brand: product?.brand,
        price: Math.round(Number(product?.price?.match(/\d/g).join('')) / 100),
        category: product?.category[1],
        quantity: Math.round(Math.random() * 1000),
        sold: Math.round(Math.random() * 100),
        image: product?.images,
        color: product?.variants.find((el) => el.label === 'Color')?.variants[0] || '',
        thumb: product?.thumb,
        totalRatings: Math.round(Math.random() * 5),
    });
    console.log('product', product);
};

const insertProduct = asyncHandler(async (req, res) => {
    const promises = [];
    for (let product of data) promises.push(fn(product));
    await Promise.all(promises);
    return res.json('ok');
});

const fn2 = async (cate) => {
    await Category.create({
        title: cate?.cate,
        brand: cate?.brand,
        image: cate?.image,
    });
};

const insertCategory = asyncHandler(async (req, res) => {
    const promises = [];
    for (let cate of dataCate) promises.push(fn2(cate));
    await Promise.all(promises);
    return res.json('ok');
});

module.exports = {
    insertProduct,
    insertCategory,
};
