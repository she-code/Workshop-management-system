const mongoose =require('mongoose');
const validator=require('validator');

const adminSchema=new mongoose.Schema({
    fname:{
        type:String,
        required:[true, "Please insert your first name"],
        validate:[validator.isAlpha, "A name must only contain english characters"],
        trim:true,
        minlength:[2,"A name must contain chracters greater than 2"],
        maxlength:[25,"A name must contain chracters smaller than 25"],

    },
    lname:{
        type:String,
        required:[true, "Please insert your last name"],
        validate:[validator.isAlpha, "A name must only contain english characters"],
        trim:true,
        minlength:[2,"A name must contain chracters greater than 2"],
        maxlength:[25,"A name must contain chracters smaller than 25"],

    },
    email:{
        type:String,
        required:[true, "Please insert your email address"],
        validate:[validator.isEmail, "Please insert a valid email address"],
        trim:true,
        unique:true,
        lowercase:true,

    },
    password:{
        type:String,
        required:[true,"Enter password"],
        select:false,
        minlength:[8,"Password must be greater than 8 characters"],
        maxlength:[8,"Password must be smaller than 25 characters"],
    },
    password2:{
        type:String,
        required:[true,"confirm your password"],
        select:false,
        validate:{
            validator:function (el){
                return (el === this.password);               
            }
        }
        
    },
    avatar:String,
    dateCreatedAt:{
        type:Date,
        default:Date.now()
    },
   
    passwordChangedAt: Date,
    passwordresetToken: String,
    passwordResetExpires: Date,
    active: {
      type: Boolean,
      default: true,
      select: false,
    },
    role:{
        type:String,
        default:'admin'    }

})

const Admin=mongoose.model('Admin',adminSchema);
module.exports=Admin;