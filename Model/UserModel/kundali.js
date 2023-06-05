const mongoose = require('mongoose');


const kundilSchema = mongoose.Schema({
    name: {
        type: String
    }, 
    gender: {
        type: String
    }, 
    DOB : {
        type: String
    }, 
    time: {
        type: String
    }, 
    place: {
        type: String
    }, 

})


const kundli = mongoose.model('kundli', kundilSchema);

module.exports = kundli