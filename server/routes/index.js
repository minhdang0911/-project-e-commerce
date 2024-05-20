const userRouter = require('./user');

const initRoutes = (app) => {
    app.use('/api/user', userRouter);
};

module.exports = initRoutes;
