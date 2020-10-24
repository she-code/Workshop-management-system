const jwt=require('jsonwebtoken');
const AppError=require('../utils/appError');
const Email=require('../utils/email');
const catchAsync=require('../utils/catchAsync');
const { promisify } = require('util');
const signToken = (id) => {
    return jwt.sign({ id: id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });
  };
  
  const createSendToken = (user, statusCode, res) => {
    const token = signToken(user._id);
    const cookieOptions = {
      expires: new Date(
        Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 1000
      ),
      httpOnly: true,
    };
    if (process.env.NODE_ENV === 'production') {
      cookieOptions.secure = true;
    }
    //sending cookie
    res.cookie('jwt', token, cookieOptions);
    user.password = undefined;
    res.status(statusCode).json({
      status: 'Success',
      token,
      data: {
        user,
      },
    });
  };
exports.login=(Model)=>{
    return catchAsync(async (req,res,next)=>{
    const {email,password} =req.body;

   // console.log({email},{password})
    if(!email || !password) {
        return next(new AppError('Please enter email or password',404));
    }
    const user=await Model.findOne({email}).select('+password');   
    // console.log(user.password)
    // let x=await (user.correctPassword(password,user.password))
    if(!user || !await (user.correctPassword(password,user.password))){
        return next (new AppError('Invalid password or email',401));
    }

    createSendToken(user,200,res)
    new Email(user,'').sendWelcome(`<h2>Successfully logged in</h2>`)
})}

exports.protect =(Model)=> {
    return catchAsync(async (req, res, next) => {
    let token;
    //1) geting token and check if it exists
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      token = req.headers.authorization.split(' ')[1];
      console.log({token});
    } else if (req.cookies.jwt) {
      token = req.cookies.jwt;
    }
    if (!token) {
      return next(
        new AppError('You are not logged in! Please login to access', 401));
    }
  
    // 2) verification token
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
    console.log({decoded});
  
    // 3 check if user still exists
    const currentUser = await Model.findById(decoded.id);
    if (!currentUser) {
      return next(
        new AppError('The user belonging to this token no longer exists', 401)
      );
    }
  
    //4 check if user chages password after token
    if (currentUser.changePasswordAfter(decoded.iat)) {
      return next(new AppError('User changed password. Please login again', 401));
    }
    //grant access to the protected route
    req.user = currentUser;
    next();
  });
  }

exports.restrictTo = (...roles) => {
    return (req, res, next) => {
      //role['admin','lead-guide'] role='user
      if (!roles.includes(req.user.role)) {
        return next(
          new AppError('You do not have permission to perform this action', 403)
        );
      }
      next();
    };
  };