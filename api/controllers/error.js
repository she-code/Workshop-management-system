const mongoose = require('mongoose');
const AppError=require('../utils/appError');


const sendErrorDev=(err,res)=>{
    res.status(err.statusCode).json({
        status:err.status,
        error:err,
        message:err.message,
        stack:err.stack
    })
}
const sendErrorProd = (err, res) => {
    // Operational, trusted error: send message to client
    if (err.isOperational) {
      res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
      });
  
      // Programming or other unknown error: don't leak error details
    } else {
      // 1) Log error
      console.error('ERROR 💥', err);
  
      // 2) Send generic message
      res.status(500).json({
        status: 'error',
        message: 'Something went very wrong!',
      });
    }
  };
const handleMongoError=(error)=>{
 return new AppError('Duplicate value',400);
}

const handleJWTError = (error) => {
  const message = 'Invalid token! Please login again';
  return new AppError(message, 401);
}




module.exports=(err,req,res,next)=>{

    err.statusCode =500 || err.statusCode;
    err.status=err.status|| 'error';

    if(process.env.NODE_ENV === 'development'){
         sendErrorDev(err,res)

    }else if(process.env.NODE_ENV === 'production'){
        let error = { ...err };

        if(error.name === 'MongoError') error= handleMongoError(error);
        if(error.code === 11000) error= handleMongoError(error);
        if (error.name === 'JsonWebTokenError') error = handleJWTError(error);
        sendErrorProd(err,res);
    }
}