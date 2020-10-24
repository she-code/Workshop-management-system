const mongoose =require('mongoose');
const validator=require('validator');
const bcrypt=require('bcryptjs');
const crypto=require('crypto');

const participantSchema=new mongoose.Schema({
    
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
    role:{
        type:String,
        // enum:{
        //     values:['admin','participant','advisor'],
        //     message:'Role can only be admin, participant or advisor'
        // },
       // required:[true,'Role is a required filed']
       default:'participant'
    },
    participant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'participant'
    },
    project: {
      type: mongoose.Schema.ObjectId,
      ref: 'Project'
  },
    team: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Team'
  },
    workshop: {
      type: mongoose.Schema.ObjectId,
      ref: 'Workshop'
  },
    passwordChangedAt: Date,
    passwordresetToken: String,
    passwordResetExpires: Date,
    active: {
      type: Boolean,
      default: true,
      select: false,
    },
    inviteMemberToken:String,
    inviteTokenExpires:Date

    
}, {toJSON: {
  virtuals: true,
},
toObject: {
  virtuals: true,
},}

);
//encrypt the password
participantSchema.pre('save',async function(next){
    /// encrypt the password
    //check if password is changed
    if(!this.isModified('password')) return next();

    this.password=await bcrypt.hash(this.password,12);
    this.password2=undefined;
    next();
});

participantSchema.methods.correctPassword = async function (
    candidatePassword,
    password
  ) {
    return await bcrypt.compare(candidatePassword, password);
  }
  participantSchema.methods.changePasswordAfter = function (JWTTimestamp) {
    if (this.passwordChangedAt) {
      const changedTimestamp = parseInt(
        this.passwordChangedAt.getTime() / 1000,
        10
      );
      //console.log(changedTimestamp, JWTTimestamp);
      return JWTTimestamp < changedTimestamp;
    }
    //no change
    return false;
  };
  
  participantSchema.pre('save', function (next) {
    if (!this.isModified('password') || this.isNew) return next();
    this.passwordChangedAt = Date.now() - 1000;
    next();
  });

participantSchema.methods.createInviteToken=function(){
  const inviteToken=crypto.randomBytes(32).toString('hex');
  this.inviteMemberToken=crypto.createHash('sha256').update(inviteToken).digest('hex');
  console.log({inviteToken},this.inviteMemberToken);

  this.inviteTokenExpires=Date.now() + 10 * 60 *1000;
  return inviteToken;
}
// participantSchema.pre(/^find/, function (next) {
//   this.populate({
//     path: 'project',
//   });
//   next();
// });

// participantSchema.virtual('projects', {
//   ref: 'Project',
//   foreignField: 'assignedTo',
//   localField: '_id',
// });
participantSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'workshop',
      select:'name'
  });
  next();
});

const Participant=mongoose.model('Participant',participantSchema);
//exports.participant=participant;
module.exports=Participant;

