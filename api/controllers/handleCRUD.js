const AppError=require('../utils/appError');
const catchAsync=require('../utils/catchAsync');
const APIFeatures=require('../utils/apiFeatures');

exports.getAllDocuments = (Modal) =>
  catchAsync(async (req, res, next) => {
    //check if there is a tour id
    // only the reviews where the id matches r displayed

    let filter = {};
    if (req.params.workshopID) filter = { workshop: req.params.workshopID };
    if (req.params.participantID) filter = { leader: req.params.participantID };

    const features = new APIFeatures(Modal.find(filter), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();
      const allDocs = await features.query;
    //const allDocs = await features.query.explain();
    //query.sort().select().skip().limit()
    //send query
    res.status(200).json({
      status: 'success',
      requestedAt: req.requestTime,
      results: allDocs.length,
      data: {
        allDocs,
      },
    });
  });
exports.getSingleDoc = (Modal, populateOptions) =>
  catchAsync(async (req, res, next) => {
    let query = Modal.findById(req.params.id);
    if (populateOptions) query = query.populate(populateOptions);
    const singleValue = await query;
    //singleValue.findOne({_id:req.params.id})
    if (!singleValue) {
      return next(new AppError('No result found with the following ID', 404));
    }
    res.status(200).json({
      status: 'Success',
      data: {
        singleValue,
      },
    });
  });


exports.createOne= (Model) =>{
   return catchAsync(async (req,res,next)=>{
        const data=await Model.create(req.body);
        console.log("createdata",req.body);
        
        res.status(201).json({
            status:'success',
            data,
          //  error

        })
    })
}

exports.updateOne = (Modal) =>
  catchAsync(async (req, res, next) => {
    const doc = await Modal.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!doc) {
      return next(new AppError('No value found with the following ID', 404));
    }
    res.status(200).json({
      status: 'success',
      data: {
        doc,
      },
    });
  });
 
 exports.deleteOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndDelete(req.params.id);
    if (!doc) {
      return next(new AppError('No document found with the following ID', 404));
    }
    res.status(204).json({
      status: 'success',
      data: null,
    });
  });
