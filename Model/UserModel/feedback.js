const mongoose = require('mongoose');

const FeedbackSchema = new mongoose.Schema({
UserId: {type: String},
name: {type: String},
Feedback: {type: String},
astroId: {type: mongoose.Schema.Types.ObjectId, 
 ref: "astrologer"}, 
rating:{
    type: Number,
    required: true,
    max:[5,'too many arguments']
},

}, 
 { timestamps: true});

module.exports = mongoose.model('feedback', FeedbackSchema);
