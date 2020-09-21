const handleCEUD = require('./handleCRUD');
const Project = require("../models/Project");
const catchAsync=require("../utils/catchAsync");
const AppError=require('../utils/appError');

exports.createProject = handleCEUD.createOne(Project);
exports.getAllProjects=handleCEUD.getAllDocuments(Project)

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
  project.assignedTo=req.params.participantID;
  project.assigned=true
  project.save({runValidators: true,})
  //console.log(project.assignedTo)
  res.status(200).json({
    status:'success',
    project
  })
})
exports.setUserId=(req,res,next)=>{
  if(!req.body.assignedTo) req.body.assignedTo=req.params.participantID;
  console.log(req.body.assignedTo,req.params.participantID);
  next();
}