const mongoose = require('mongoose');


const UserStatus = mongoose.Schema({
    astroId: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: "astrologer", 
        required: true
    }, 
    userId: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User",
        required: true
    },
    channelName : {
        type: String
    }, 
    time: {
        type: Number
    }, 
    status: {
        type: Boolean,
        default: false
    }, 
    token : {
        type: String
    },
   expiretime: {
    type: Boolean,
    default: true
   }
}, {timestamps: true})

const Userstatus = mongoose.model('userStatus', UserStatus);

module.exports = Userstatus