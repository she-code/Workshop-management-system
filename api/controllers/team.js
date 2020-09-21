const catchAsync=require('../utils/catchAsync');
const AppError=require('../utils/appError');
const Team=require('../models/Team');
const handleCRUD=require('./handleCRUD');
const Participant=require('../models/Participants');
const nodemailer=require('nodemailer');
const crypto=require('crypto');

exports.createTeam=handleCRUD.createOne(Team);
exports.getAllTeams=handleCRUD.getAllDocuments(Team)
exports.setLeaderID=(req,res,next)=>{
    if(!req.body.leader) req.body.leader=req.params.participantID;
    next()
}

exports.inviteMembers=catchAsync(async (req,res,next) =>{
    const leader=await Team.findOne({leader:req.params.participantID});
    let unique=false;
    const guest=req.body.email;
 
    for(let i in leader.invite){
        if(!(leader.invite[i].email === guest)){
           // console.log('unique');
            unique=true;
        }
    }
    if(unique){
        const inviteToken=crypto.randomBytes(32).toString('hex');  
        leader.invite.push({
            email:guest,
            inTok:crypto.createHash('sha256').update(inviteToken).digest('hex'),
            inTokExp:Date.now() + 10 * 60 *1000,
            status:'Pending'
        })
        leader.save()
        const url=`${req.protocol}://${req.get(
            'host'
          )}/api/v1/participants/${leader.leader}/team/joinTeam/${inviteToken}`;         
        let transporter = nodemailer.createTransport({
            host:process.env.EMAIL_HOST,
            port: process.env.EMAIL_PORT,
            auth: {
              user: process.env.EMAIL_USERNAME,
              pass: process.env.EMAIL_PASSWORD
            }
          });
        transporter.sendMail({
        from: '"Fred Foo 👻" <foo@example.com>', 
        to:guest, //leader.inviteList,
        subject: "Hello ✔", 
        text: "Hello world?", 
        html: `<p>Please click the link bellow to join the team</p><a href=${url}>${url}</a>`, 
        })
    }else{
        console.log('invitation already sent')
    }


    res.status(200).json({
        status:'success',
        leader,
        message:'An invitation link has been sent to the user'
    })
   
//  console.log(leader.invite)
   // res.json('good luck')
})

exports.joinTeam=catchAsync(async (req,res,next) =>{
    
    let email;
    //1 get user based on token
   const hashedToken = crypto
   .createHash('sha256')
   .update(req.params.token)
   .digest('hex');
   const team = await Team.findOne({
        invite:{
            $elemMatch:{inTok:hashedToken},
            $elemMatch:{inTokExp:{ $gt: Date.now() }},
        }
   });
//    console.log({hashedToken},req.params.token)

  // console.log(team)
   if(!team){
       return next(new AppError('Invalied token or token has expired',400));
   }
   for(let i in team.invite){
    if((team.invite[i].inTok === hashedToken)){
        
      //  console.log('found',team.invite[i]);
        email=team.invite[i].email;
        team.invite[i].inTok=undefined;
        team.invite[i].inTokExp=undefined;
        team.invite[i].status='active'
        
       // console.log('email',email)
       
    }
}
  
 let participant=await Participant.findOne({email:email});
 if(!participant){
    participant=await Participant.create({
                   role:'member',
                   fname:req.body.fname,
                   lname:req.body.lname,
                   email:email,
                   password:req.body.password,
                   password2:req.body.password2,
               })
          
            
 }
 if(team.members.includes(participant._id)){
    console.log('yes fre')
} else{
    team.members.unshift(participant._id);
    team.save();
} 

   
   res.status(200).json({
       status:'success',
       team
   })
})