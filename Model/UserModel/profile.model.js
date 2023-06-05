const mongoose = require("mongoose");
const schema = new mongoose.Schema({
    name: {
        type: String,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    languages: {
        type: [String]
    },
    skills: {
        type: [String]
    },
    
})