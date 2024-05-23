const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var blogSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        category: {
            type: String,
            required: true,
        },
        numberView: {
            type: Number,
            default: 0,
        },
        likes: [
            {
                type: mongoose.Types.ObjectId,
                ref: 'User',
            },
        ],
        dislikes: [
            {
                type: mongoose.Types.ObjectId,
                ref: 'User',
            },
        ],
        image: {
            type: String,
            default:
                'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSb1EAtVWvFgXSAY05cDuz1THlqnT-GfjOhxjmA0GCCalZM3h8stGtmAIiRL6vUoW76GLc&usqp=CAU',
        },
        author: {
            type: String,
            default: 'admin',
        },
    },
    {
        timestamps: true,
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
    },
);

//Export the model
module.exports = mongoose.model('Blog', blogSchema);
