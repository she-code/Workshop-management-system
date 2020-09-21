const catchAsync=require('../utils/catchAsync');
const handleCRUD=require('./handleCRUD');
const Workshop=require('../models/Workshop');

exports.createWorkshop=handleCRUD.createOne(Workshop);
exports.getAllworkshops=handleCRUD.getAllDocuments(Workshop);