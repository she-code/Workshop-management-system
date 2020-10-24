const mongoose=require('mongoose');
const Participant = require('./Participants');
const crypto=require('crypto');

const teamSchema=new mongoose.Schema({
    name:{
        type:String,
        unique:[true,"Team name already in use "],
        required:[true,"A team name is a required field"]
    },
    leader:{
        type:mongoose.Schema.Types.ObjectId,
        ref:Participant,
        required:['A team must belong to owner']
    },
    //inviteList:[String],
    members:{
        type:[{ type:  mongoose.Schema.ObjectId, 
        ref: 'Participant' }],
    //  validate:[sizeLimit, '{PATH} exceeds the limit of 10']
    },
    invite:[
      {
        email:{type:String,default:''},
        inTok:{type:String,default:''},
        inTokExp:{type:String,default:''},
        status:{type:String,default:''}
     
        
      }
    ],
    teamSlotsAllowed:{
        type:Number
    },
    workshop: {
      type: mongoose.Schema.ObjectId,
      ref: 'Workshop'
  },
},
{
  toJSON: {
      virtuals: true
}})

teamSchema.path('members').validate(function (value) {
  console.log(value.length)
  if (value.length > 3) {
    throw new Error("Team members can't be greater than 3!");
   } 
});
// teamSchema.virtual('leader', {
//     ref: 'leader',
//     foreignField: 'leader',
//     localField: '_id',
//     justOne:false
// });
// function sizeLimit(val) {
//   return val.length > 3;
// }
// teamSchema.methods.createInviteToken=function(){
//     const inviteToken=crypto.randomBytes(32).toString('hex');
//     this.inviteMemberToken.push(crypto.createHash('sha256').update(inviteToken).digest('hex'));
//     console.log({inviteToken},this.inviteMemberToken);
  
//     this.inviteTokenExpires.push(Date.now() + 10 * 60 *1000);
//     return inviteToken;
//   }


teamSchema.pre(/^find/, function (next) {
    this.populate({
      path: 'members',
     select: 'fname lname email  ',
    });
    next();
  });
  
  teamSchema.pre(/^find/, function (next) {
    this.populate({
      path: 'leader',   
    });
    next();
  });
  






const Team=mongoose.model('Team',teamSchema);

module.exports=Team;