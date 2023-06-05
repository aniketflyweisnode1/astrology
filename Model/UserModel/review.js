const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    astroId: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: "astrologer"
    },
    rating:{
        type: Number,
        required: true,
        max:[5,'too many arguments']
    },
    comment: String
},{
    timestamps: true
})

module.exports = mongoose.model('Review',reviewSchema);