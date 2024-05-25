const userRouter = require('./user');
const productRouter = require('./product');
const ProductCategoryRouter = require('./productCategory');
const BlogCategoryRouter = require('./blogCategory');
const blogRouter = require('./blog');
const brandRouter = require('./brand');
const couponRouter = require('./coupon');
const orderRouter = require('./order');
const insertRouter = require('./insert');
const { notFound, errHandler } = require('../middlewares/errHandler');

const initRoutes = (app) => {
    app.use('/api/user', userRouter);
    app.use('/api/product', productRouter);
    app.use('/api/prodcategory', ProductCategoryRouter);
    app.use('/api/blogcategory', BlogCategoryRouter);
    app.use('/api/blog', blogRouter);
    app.use('/api/brand', brandRouter);
    app.use('/api/coupon', couponRouter);
    app.use('/api/order', orderRouter);
    app.use('/api/insert', insertRouter);
    app.use(notFound);
    app.use(errHandler);
};

module.exports = initRoutes;
