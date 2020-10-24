const Task =require('../models/Task');
const catchAsync =require ('../utils/catchAsync');
const AppError = require('../utils/appError');
const handleCRUD=require('./handleCRUD');
const auth = require('./auth');
const Participant = require('../models/Participants');

exports.createTask= handleCRUD.createOne(Task);
exports.viewPublicTask = catchAsync(async (req,res, next) => {
    const tasks = await Task.find({visibility:'public'})
    if(!tasks) {
        return next(new AppError('There are no public tasks created',404));

    }
    res.status(200).json({
        status:'success',
        results:tasks.length,
        tasks
    })
})

exports.updateTask=handleCRUD.updateOne(Task)
exports.getTask=handleCRUD.getSingleDoc(Task)
exports.deleteTask=handleCRUD.deleteOne(Task)
exports.protect=auth.protect(Participant);
exports.setParticipantId=(req,res,next)=>{
    if(!req.body.createdBy)  req.body.createdBy=req.user.id;
    next();
}
exports.getUserTasks = catchAsync ( async (req,res,next)=>{
    const task = await Task.find({createdBy:req.params.participantId})
   // console.log(task)
    if(!task){
       return next(new AppError('No tasks created',404))
    }
    res.status(200).json({
        status:'success',
        results:task.length,
        task
    })
})

exports.deleteTask1= catchAsync(async ( req,res,next) =>{
    const task = await Task.findById(req.params.id)
    console.log(task.createdBy,req.user.id)
    if(task.createdBy != req.user.id){
      return  next(new AppError('Un authorized',401))
    }
   /// console.log(task)
    res.status(204).json({
        status:'success',
        data:null
    })
})

