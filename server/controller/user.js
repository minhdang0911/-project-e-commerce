const User = require('../models/user');
const asyncHandler = require('express-async-handler');
const { generateAccessToken, generateRefreshToken } = require('../middlewares/jwt');
const jwt = require('jsonwebtoken');
const sendMail = require('../utils/sendMail');
const crypto = require('crypto');
const makeToken = require('uniqid');

// const register = asyncHandler(async (req, res) => {
//     const { email, password, firstname, lastname } = req.body;
//     console.log(req.body);

//     if (!email || !password || !lastname || !firstname) {
//         return res.status(400).json({
//             success: false,
//             mes: 'Missing inputs',
//         });
//     }

//     const user = await User.findOne({ email });
//     if (user) {
//         return res.status(400).json({
//             success: false,
//             mes: 'Email is already in use',
//         });
//     } else {
//         const newUser = await User.create(req.body);
//         return res.status(200).json({
//             success: true,
//             mes: 'Register is successfully. Please go login~',
//         });
//     }
// });

// Refresh token => Cấp mới access token
// Access token => Xác thực người dùng, quân quyên người dùng
// const login = asyncHandler(async (req, res) => {
//     const { email, password } = req.body;
//     if (!email || !password) {
//         return res.status(400).json({
//             success: false,
//             message: 'Missing input',
//         });
//     }

//     const response = await User.findOne({ email });
//     if (response && (await response.isCorrectPassword(password))) {
//         // Không trả về password và role
//         const { password, role, ...userData } = response.toObject();

//         // Tạo access token
//         const accessToken = generateAccessToken(response._id, role);
//         const refreshToken = generateRefreshToken(response._id); // Đảm bảo gọi đúng hàm

//         // Lưu refresh token vào cơ sở dữ liệu
//         try {
//             const updatedUser = await User.findByIdAndUpdate(
//                 response._id,
//                 { refreshtoken: refreshToken }, // Ensure the field name is correct
//                 { new: true },
//             );
//         } catch (error) {
//             console.error('Error updating refresh token:', error);
//             return res.status(500).json({
//                 success: false,
//                 message: 'Failed to save refresh token',
//             });
//         }

//         // Lưu refresh token vào cookie
//         res.cookie('refreshToken', refreshToken, { httpOnly: true, maxAge: 7 * 24 * 60 * 60 * 1000 }); // Sửa maxAge là giá trị số

//         return res.status(200).json({
//             success: true,
//             accessToken,
//             userData,
//         });
//     } else {
//         throw new Error('Invalid credentials');
//     }
// });

const register = asyncHandler(async (req, res) => {
    const { email, password, firstname, lastname, mobile } = req.body;
    if (!email || !password || !lastname || !firstname || !mobile) {
        return res.status(400).json({
            success: false,
            mes: 'Thiếu thông tin đầu vào',
        });
    }

    const user = await User.findOne({ email });
    if (user) {
        return res.status(400).json({
            success: false,
            mes: 'Email is already in use',
        });
    } else {
        const token = makeToken();
        const emailEdited = btoa(email) + '@' + token;
        const newUser = await User.create({
            email: emailEdited,
            password,
            firstname,
            lastname,
            mobile,
        });
        // res.cookie('dataregister', { ...req.body, token }, { httpOnly: true, maxAge: 15 * 60 * 1000 });
        if (newUser) {
            const html = `<h2>Mã đăng kí tài khoản: <br /> <blockquote>${token}</blockquote></h2>`;
            await sendMail({ email, html, subject: 'Xác nhận đăng ký tài khoản' });
        }
        setTimeout(async () => {
            await User.deleteOne({ email: emailEdited });
        }, [300000]);
        return res.json({
            success: newUser ? true : false,
            mes: newUser ? 'Vui lòng kiểm tra email của bạn để kích hoạt tài khoản' : 'Có lỗi xảy ra',
        });
    }
});

const finalregister = asyncHandler(async (req, res) => {
    // const cookie = req.cookies;
    const { token } = req.params;
    const notActivedEmail = await User.findOne({ email: new RegExp(`${token}$`) });
    if (notActivedEmail) {
        notActivedEmail.email = atob(notActivedEmail?.email?.split('@')[0]);
        notActivedEmail.save();
    }
    return res.json({
        success: notActivedEmail ? true : false,
        mes: notActivedEmail ? notActivedEmail : 'Somethings went wrongs',
    });
    // if (!cookie || cookie?.dataregister?.token !== token) {
    //     res.clearCookie('dataregister');
    //     return res.redirect(`${process.env.CLIENT_URL}/finalregister/failed`);
    // }

    // const newUser = await User.create({
    //     email: cookie?.dataregister?.email,
    //     password: cookie?.dataregister?.password,
    //     firstname: cookie?.dataregister?.firstname,
    //     lastname: cookie?.dataregister?.lastname,
    //     mobile: cookie?.dataregister?.mobile,
    // });
    // res.clearCookie('dataregister');
    // if (newUser) {
    //     return res.redirect(`${process.env.CLIENT_URL}/finalregister/success`);
    // } else {
    //     return res.redirect(`${process.env.CLIENT_URL}/finalregister/failed`);
    // }
});

const login = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({
            success: false,
            message: 'Missing input',
        });
    }

    const response = await User.findOne({ email });
    if (response && (await response.isCorrectPassword(password))) {
        // Không trả về password và role
        const { password, role, refreshtoken, ...userData } = response.toObject();

        // Tạo access token
        const accessToken = generateAccessToken(response._id, role);
        const newrefreshToken = generateRefreshToken(response._id);

        // Lưu refresh token vào cơ sở dữ liệu
        try {
            const updatedUser = await User.findByIdAndUpdate(
                response._id,
                { refreshtoken: newrefreshToken }, // Ensure the field name is correct
                { new: true },
            );
            console.log('Refresh token saved to DB:', updatedUser);
        } catch (error) {
            console.error('Error updating refresh token:', error);
            return res.status(500).json({
                success: false,
                message: 'Failed to save refresh token',
            });
        }

        // Lưu refresh token vào cookie
        res.cookie('refreshToken', newrefreshToken, { httpOnly: true, maxAge: 7 * 24 * 60 * 60 * 1000 }); // Sửa maxAge là giá trị số

        return res.status(200).json({
            success: true,
            accessToken,
            userData,
        });
    } else {
        throw new Error('Bạn đã nhập sai tài khoản hoặc mật khẩu');
    }
});

const getCurrent = asyncHandler(async (req, res) => {
    const { _id } = req.user;
    const user = await User.findById(_id).select('-refreshToken -password ');
    return res.status(200).json({
        success: user ? true : false,
        rs: user ? user : 'User not found',
    });
});

const refreshAccessToken = asyncHandler(async (req, res) => {
    // Lấy token từ cookies
    const cookie = req.cookies;

    // Check xem có token hay không
    if (!cookie || !cookie.refreshToken) throw new Error('No refresh token in cookies');
    // Check token có hợp lệ hay không
    const rs = await jwt.verify(cookie.refreshToken, process.env.JWT_SECRET);

    const response = await User.findOne({ _id: rs._id, refreshtoken: cookie.refreshToken });

    console.log('id', rs._id, 'resfreshToken', cookie.refreshToken);
    return res.status(200).json({
        success: response ? true : false,
        newAccessToken: response ? generateAccessToken(response._id, response.role) : 'Refresh token not matched',
    });
});

const logout = asyncHandler(async (req, res) => {
    const cookie = req.cookies;
    if (!cookie || !cookie.refreshToken) throw new Error('No refresh token in cookies');
    // Xóa refresh token ở db
    await User.findOneAndUpdate({ refreshtoken: cookie.refreshToken }, { refreshToken: '' }, { new: true });
    // Xóa refresh token ở cookie trình duyệt
    res.clearCookie('refreshToken', {
        httpOnly: true,
        secure: true,
    });
    return res.status(200).json({
        success: true,
        mes: 'Logout is done',
    });
});

const forgotPassword = asyncHandler(async (req, res) => {
    const { email } = req.body;
    if (!email) throw new Error('Thiếu email');
    const user = await User.findOne({ email });
    if (!user) throw new Error('Người dùng không tìm thấy');
    const resetToken = user.createPasswordChangedToken();
    await user.save();

    const html = `Xin vui lòng click vào link dưới đây để thay đổi mật khẩu của bạn. Link này sẽ hết hạn sau 15 phút kể từ bây giờ. 
    <a href=${process.env.CLIENT_URL}/reset-password/${resetToken}>Click here</a>`;

    const data = {
        email,
        html,
        subject: 'Quên mật khẩu',
    };
    const rs = await sendMail(data);
    return res.status(200).json({
        rs,
        success: rs?.response?.includes('OK') ? true : false,
        mes: rs?.response?.includes('OK') ? 'Vui lòng kiểm tra email của bạn' : 'Đã có lỗi vui lòng thử lại sau',
    });
});

const resetPassword = asyncHandler(async (req, res) => {
    const { password, token } = req.body;
    if (!password || !token) throw new Error('Missing imputs');
    const passwordResetToken = crypto.createHash('sha256').update(token).digest('hex');
    const user = await User.findOne({ passwordResetToken, passwordResetExpires: { $gt: Date.now() } });
    if (!user) throw new Error('Invalid reset token');
    user.password = password;
    user.passwordResetToken = undefined;
    user.passwordChangedAt = Date.now();
    user.passwordResetExpires = undefined;
    await user.save();
    return res.status(200).json({
        success: user ? true : false,
        mes: user ? 'Updated password' : 'Something went wrong',
    });
});

const getUsers = asyncHandler(async (req, res) => {
    const queries = { ...req.query };

    const exclude = ['limit', 'sort', 'page', 'fields'];
    exclude.forEach((el) => delete queries[el]);

    let queryString = JSON.stringify(queries);
    queryString = queryString.replace(/\b(gte|gt|lt|lte)\b/g, (matchedEl) => `$${matchedEl}`);
    const formatedQueries = JSON.parse(queryString);

    const query = {};

    if (req.query.q) {
        delete formatedQueries.q;
        formatedQueries['$or'] = [
            { firstname: { $regex: req.query.q, $options: 'i' } },
            { lastname: { $regex: req.query.q, $options: 'i' } },
            { email: { $regex: req.query.q, $options: 'i' } },
        ];
    }
    // Filtering
    if (queries?.name) formatedQueries.name = { $regex: queries.name, $options: 'i' };

    let queryCommand = User.find(formatedQueries);

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
        const counts = await User.countDocuments(formatedQueries);
        return res.status(200).json({
            success: response.length > 0,
            user: response,
            counts,
        });
    } catch (err) {
        return res.status(500).json({ success: false, message: err.message });
    }
});

const deleteUser = asyncHandler(async (req, res) => {
    const { uid } = req.params;
    const response = await User.findByIdAndDelete(uid);
    return res.status(200).json({
        success: response ? true : false,
        mes: response ? `User with email ${response.email} deleted` : 'No user delete',
    });
});

const UpdateUser = asyncHandler(async (req, res) => {
    console.log(req.file);
    const { _id } = req.user;
    const { firstname, lastname, email, mobile } = req.body;
    const data = { firstname, lastname, email, mobile };
    if (req.file) data.avatar = req.file.path;
    if (!_id) throw new Error('Missing input');
    const response = await User.findByIdAndUpdate(_id, data, { new: true }).select('-password -role');
    return res.status(200).json({
        success: response ? true : false,
        mes: response ? 'Cập nhật thành công1' : 'Cập nhật thất bại',
    });
});

const updateUserByAdmin = asyncHandler(async (req, res) => {
    //
    const { uid } = req.params;
    if (Object.keys(req.body).length === 0) throw new Error('Missing inputs');
    const response = await User.findByIdAndUpdate(uid, req.body, { new: true }).select('-password -role -refreshToken');
    return res.status(200).json({
        success: response ? true : false,
        updatedUser: response ? response : 'Some thing went wrong',
    });
});

const updateUserAddress = asyncHandler(async (req, res) => {
    //
    const { _id } = req.user;
    if (!req.body.address) throw new Error('Missing inputs');
    const response = await User.findByIdAndUpdate(_id, { $push: { address: req.body.address } }, { new: true }).select(
        '-password -role -refreshToken',
    );
    return res.status(200).json({
        success: response ? true : false,
        updatedUser: response ? response : 'Some thing went wrong',
    });
});

const updateCart = asyncHandler(async (req, res) => {
    //
    const { _id } = req.user;
    const { pid, quantity, color } = req.body;
    if (!pid || !quantity || !color) throw new Error('Missing inputs');

    const user = await User.findById(_id).select('cart');
    const alreadyProduct = user?.cart.find((el) => el.product.toString() === pid);
    if (alreadyProduct) {
        if (alreadyProduct.color === color) {
            const response1 = await User.updateOne(
                { cart: { $elemMatch: alreadyProduct } },
                { $set: { 'cart.$.quantity': quantity } },
                { new: true },
            );
            return res.status(200).json({
                success: response1 ? true : false,
                updatedUser: response1 ? response1 : 'Some thing went wrong',
            });
        } else {
            const response = await User.findByIdAndUpdate(
                _id,
                { $push: { cart: { product: pid, quantity, color } } },
                { new: true },
            );
            return res.status(200).json({
                success: response ? true : false,
                updatedUser: response ? response : 'Some thing went wrong',
            });
        }
    } else {
        const response = await User.findByIdAndUpdate(
            _id,
            { $push: { cart: { product: pid, quantity, color } } },
            { new: true },
        );
        return res.status(200).json({
            success: response ? true : false,
            updatedUser: response ? response : 'Some thing went wrong',
        });
    }
});

module.exports = {
    register,
    login,
    getCurrent,
    refreshAccessToken,
    logout,
    forgotPassword,
    resetPassword,
    getUsers,
    deleteUser,
    UpdateUser,
    updateUserByAdmin,
    updateUserAddress,
    updateCart,
    finalregister,
};
