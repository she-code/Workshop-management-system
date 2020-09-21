const mongoose=require('mongoose');
const Participant = require('./Participants');
const crypto=require('crypto');
const { timeStamp } = require('console');

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
    inviteList:[String],
    members:[{ type:  mongoose.Schema.ObjectId, ref: 'Participant' }],
    //[
    //    {
    //     id:String,
    //     email:String,
    //     role:String,
       
    //     }
    // ],
    invite:[
      {
        email:{type:String,default:''},
        inTok:{type:String,default:''},
        inTokExp:{type:String,default:''},
        status:{type:String,default:''}
        
      }
    ],
    // inviteMemberToken:[String],
    // inviteTokenExpires:[String],
    teamSlotsAllowed:{
        type:Number
    }
})

teamSchema.methods.createInviteToken=function(){
    const inviteToken=crypto.randomBytes(32).toString('hex');
    this.inviteMemberToken.push(crypto.createHash('sha256').update(inviteToken).digest('hex'));
    console.log({inviteToken},this.inviteMemberToken);
  
    this.inviteTokenExpires.push(Date.now() + 10 * 60 *1000);
    return inviteToken;
  }


teamSchema.pre(/^find/, function (next) {
    this.populate({
      path: 'members',
     // select: 'fname lname email  ',
    });
    next();
  });
  






const Team=mongoose.model('Team',teamSchema);

module.exports=Team;