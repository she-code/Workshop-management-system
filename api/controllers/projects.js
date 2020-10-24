const handleCEUD = require('./handleCRUD');
const Project = require("../models/Project");
const catchAsync=require("../utils/catchAsync");
const AppError=require('../utils/appError');
const auth=require('./auth');
const Participant = require('../models/Participants');

exports.protect=auth.protect(Participant);
exports.createProject = handleCEUD.createOne(Project);
exports.getAllProjects=handleCEUD.getAllDocuments(Project)
exports.getProject=handleCEUD.getSingleDoc(Project);

exports.setWorkshopIds = (req, res, next) => {
    
    if (!req.body.workshop) req.body.workshop = req.params.workshopID;
   // if (!req.body.user) req.body.user = req.user.id;
    next();
  };
  
exports.chooseProject=catchAsync(async (req,res,next)=>{

  const {title} =req.body;
  //console.log(title);
  if(!title) {
    return next(new AppError('Please choose a project title',404));
  }
  const project=await Project.findOne({title});
  if(!project) {
    return next(new AppError('Project not found to add your project click the Add Project button',404));

  }
  if(project.assigned){
    return next(new AppError('Project already assigned choose another project',401));
  }

  const leader=await Participant.findOne({_id:req.user.id})
  leader.project=project._id;
  leader.save();
  console.log(leader)
  project.assignedTo=req.user.id;
  project.assigned=true
  project.save({runValidators: true,})
  console.log(project.assignedTo)
  res.status(200).json({
    status:'success',
    project
  })
})
exports.setUserId=(req,res,next)=>{
 // if(!req.body.assignedTo) req.body.assignedTo=req.params.participantID;
  if(!req.body.assignedTo) req.body.assignedTo=req.user.id;
  console.log(req.body.assignedTo,req.user.id);
  next();
}
