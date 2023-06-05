const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    userId: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "astrologer"
    },
    gallery: {
        type: [String],
    },
    trainingVideos: {
        type: [String],
    }
}, { timestamps: true });

module.exports = mongoose.model('Media', schema);