const catchAsync=require('../utils/catchAsync');
const handleCRUD=require('./handleCRUD');
const auth=require('./auth');

const Admin=require('../models/Admin');

exports.addAdmin=handleCRUD.createOne(Admin);
exports.getAllAdmins=handleCRUD.getAllDocuments(Admin);
exports.getAdmin=handleCRUD.getSingleDoc(Admin);
exports.updateAdmin=handleCRUD.updateOne(Admin);
exports.deleteAdmin=handleCRUD.deleteOne(Admin);
