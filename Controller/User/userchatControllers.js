const chatDb = require('../../Model/UserModel/usercallhistory');
const astro = require('../../Model/AstroModel/astrologer');



exports.AddChatHistory = async(req,res) => {
    try{
const userData = await astro.findById({_id : req.body.astroId});
if(!userData){
    return res.status(401).json({
        message: "No UserId is Wrong "
    })
}else{

console.log(userData);
const data = {
    astroId: req.body.astroId, 
    name: userData.firstName +" " + userData.lastName, 
    time: req.body.time, 
    timeBooked: req.body.timeBooked
}
const Data = await chatDb.create(data);
res.status(200).json({
    message: "History is Added ", 
    details : Data
})
}
    }catch(err){
        console.log(err);
        res.status(400).json({
            message: err.message
        })
    }
}


exports.getCallHistory = async(req,res ) => {
    try{
        const data = await chatDb.find();
        if(!data){
            return res.status(401).json({
                message: "No Call- history for this USer  "
            })
        }else{
            res.status(200).json({
                details: data
            })
        }
    }catch(err){
        res.status(400).json({
            message: err.message
        })
    }
}


