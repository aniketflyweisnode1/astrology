const { json } = require('express');
const horoScope = require('../../Model/UserModel/horoScope');



exports.AddHoroScope = async(req,res) => {
    try{
     const data = {
        date: req.body.date,
        horoScope: req.body.horoScope, 
        PROFESSION: req.body.profession, 
        EMOTIONS : req.body.emotions, 
        HEALTH : req.body.health,
        TRAVEL : req.body.travel, 
        Love: req.body.love, 
        LUCK: req.body.luck, 
        duration: req.body.duration, 
        rashi : req.body.rashi
     }
     const userData = await horoScope.create(data);
     res.status(200).json({userData})
    }catch(err){
        console.log(err);
        res.status(400).json({
            message: err.message
        })
    }
}


exports.GetAllHoroScope = async(req,res) => {
    try{
     const userData = await horoScope.find();
     res.status(200).json({
        details: userData
     })
    }catch(err){
        console.log(err);
        res.status(200).json({
            message: err.message
        })
    }
}



exports.getHoroByID = async(req,res) => {
    try{
        const userData = await horoScope.findById({_id: req.params.id});
        console.log(userData);
        res.status(200).json({
            details : userData
        })
    }catch(err)
    {
        console.log(err);
        res.status(400).json({
            message: err.message
        })
    }
}



exports.updateHoroScope =  async(req,res) => {
try{
  await horoScope.findByIdAndUpdate({_id: req.params.id}, {
    date: req.body.date,
    horoScope: req.body.horoScope, 
    PROFESSION: req.body.profession, 
    EMOTIONS : req.body.emotions, 
    HEALTH : req.body.health,
    TRAVEL : req.body.travel, 
    Love: req.body.love, 
    LUCK: req.body.luck, 
    duration: req.body.duration, 
    rashi : req.body.rashi
  });
  res.status(200).json({
    message: "Updated ", 
    success: true
  })

}catch(err){
    console.log(err);
    res.status(400).json({
        message:err.message
    })
}
}

exports.deleteHoroScope = async(req,res) => {
  try{
    await horoScope.findByIdAndDelete({_id: req.params.id});
    res.status(200).json({
        message: "Deleted"
    })
  }catch(err)
  {
    console.log(err);
    res.status(400).json({
        message: err.message
    })
  }
}



