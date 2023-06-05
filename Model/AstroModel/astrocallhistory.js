const mongoose  = require('mongoose');



const astrocallhistorySchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    name: {
        type: String
    }, 
    time: {
        type: String
    }, 
    // image: {
    //     type: Strin
    // }
})

const AstroCallhistory = mongoose.model('astroCallhistory', astrocallhistorySchema)

module.exports = AstroCallhistory