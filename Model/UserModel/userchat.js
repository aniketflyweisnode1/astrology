const mongoose = require('mongoose');


const userchatSchema = mongoose.Schema({
    astroId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "astrologer", 
        required: true
    },
    name: {
        type: String
    }, 
    time: {
        type: String
    }, 
    timeBooked : {
        type: String
    }
}); 


const userChat = mongoose.model('astrochat', userchatSchema);

module.exports = userChat

