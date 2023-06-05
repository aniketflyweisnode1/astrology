

const astro_Model = require('../../Model/AstroModel/astrocallhistory');
const users = require('../../Model/UserModel/User');



exports.AddCallHistory = async(req,res) => {
    try{
const userData = await users.findById({_id : req.body.userId});
if(!userData){
    return res.status(401).json({
        message: "No UserId is Wrong "
    })
}else{

console.log(userData);
const data = {
    userId: req.body.userId, 
    name: userData.firstName +" " + userData.lastName, 
    time: req.body.time
}
const Data = await astro_Model.create(data);
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
        const data = await astro_Model.find({userId: req.params.id});
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

