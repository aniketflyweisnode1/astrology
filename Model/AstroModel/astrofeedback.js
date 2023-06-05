const { default: mongoose } = require('mongoose');
const moongoose = require('mongoose');


const astrofeedback = mongoose.Schema({
   astroId: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: "astrologer", 
    required: true
   }, 
   feedback : {
    type:String
   }, 
   rating: {
      type: Number, 
      default : 0
   }
});


const feedback = mongoose.model('astrofeedback', astrofeedback);


