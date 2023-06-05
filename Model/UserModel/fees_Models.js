const mongoose = require('mongoose');


const chargesSchema = mongoose.Schema({
    astroId: {
        type:  mongoose.Schema.Types.ObjectId,
        ref: 'astrologer',
        reqired: true
    }, 
    fees: {
        type: Number
    }, 
})

const fees = mongoose.model('Charges', chargesSchema);

module.exports = fees;