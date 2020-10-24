const handleCRUD=require('./handleCRUD');
const catchAsync=require('../utils/catchAsync');
const AppError=require('../utils/appError');
const Email=require('../utils/email');
const Participant=require('../models/Participants');
const authController=require('./auth');
const jwt=require('jsonwebtoken');
const nodemailer=require('nodemailer');

const bcrypt=require('bcryptjs');

exports.addParticipant=catchAsync(async (req,res,next)=>{
    const participant=await Participant.create( req.body);

//    const url=`${req.protocol}://${req.get(
//     'host'
//   )}/api/v1/participants/login`;
  const url=`http://localhost:3000/login`;
    await new Email(participant,url).sendLogin(`Please click this link to login to your account: <a href="${url}">${url}</a>`);
  
    res.status(201).json({
        status:'success',
        data:{
            participant
        },
        message:'The user has been registered and an email has been sent to the user'
    })
    console.log("created data",req.body)
})

exports.login=authController.login(Participant);
exports.protect=authController.protect(Participant);

exports.getAllParticipants=handleCRUD.getAllDocuments(Participant);
exports.setworkshopID=(req,res,next)=>{
    if(!req.body.workshop)  req.body.workshop=req.params.workshopID;
    ///console.log(req.body.workshopID)
    next();
}
exports.getParticipant=handleCRUD.getSingleDoc(Participant,{path:'project'});
exports.updateParticipant=handleCRUD.updateOne(Participant);
exports.deleteParticipant=handleCRUD.deleteOne(Participant);
