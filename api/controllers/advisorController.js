const handleCRUD=require('./handleCRUD');
const Advisor=require('../models/Advisor');
const catchAsync=require('../utils/catchAsync');

exports.createAdvisor=catchAsync(async (req,res,next)=>{
    const advisor= await Advisor.create(req.body);

    console.log(req.body)
    res.status(201).json({
        status:'success',
        advisor,
        
    })
    
})
//=handleCRUD.createOne(Advisor);
exports.getAllAdvisors=handleCRUD.getAllDocuments(Advisor);
exports.setProjectId=(req,res,next)=>{
    if(!req.body.projectID)  req.body.projectID=req.params.projectID;
    console.log(req.body.projectID)
    next();
}
