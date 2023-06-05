const mongoose = require('mongoose');

const HoroScopeSchema = new mongoose.Schema({

date: { type: String },

horoScope: { type: String },

PROFESSION: { type: String },

EMOTIONS: { type: String },

HEALTH: { type: String },

TRAVEL: { type: String },

LOVE: { type: String },

LUCK: { type: String },
duration : {type: String}, 
rashi: {type: String}
}, 
{ timestamps: true });


module.exports = mongoose.model('UserDetail', HoroScopeSchema);

