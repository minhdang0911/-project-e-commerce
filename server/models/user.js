const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var userSchema = new mongoose.Schema(
    {
        firstname: {
            type: String,
            required: true,
        },
        lastname: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        mobile: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        role: {
            type: String,
            default: 'user',
        },
        cart: {
            type: Array,
            default: [],
        },
        address: [
            {
                type: mongoose.Types.ObjectId,
                ref: 'Address',
            },
        ],
        wishlist: [
            {
                type: mongoose.Types.ObjectId,
                ref: 'product',
            },
        ],
        isBlocked: {
            type: Boolean,
            default: false,
        },
        refreshtoken: {
            type: String,
        },
        passwordChangedAt: {
            type: String,
        },
        passwordResetToken: {
            type: String,
        },
        passwordResetExpires: {
            type: String,
        },
    },
    {
        timestamps: true,
    },
);

//Export the model
module.exports = mongoose.model('User', userSchema);
