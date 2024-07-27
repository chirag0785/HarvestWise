const mongoose = require('mongoose');
const { Schema } = mongoose;

const reviewSchema = new Schema({
    timeOfReview: {
        type: Date,
        default: Date.now
    },
    review: {
        type: String,
        required: true
    },
    images:[String],
    id: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

const inventorySchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    description: {
        type: String,
    },
    imageUrl: {
        type: String,
        required: true
    },
    seller: {
        type: String,
        required: true,
    },
    reviews: [reviewSchema]
}, {
    timestamps: true
});

module.exports = mongoose.model('Inventory', inventorySchema);
