const catchAsync=require('../utils/catchAsync');
const AppError=require('../utils/appError');
const Team=require('../models/Team');
const handleCRUD=require('./handleCRUD');
const Participant=require('../models/Participants');
const nodemailer=require('nodemailer');
const crypto=require('crypto');
const auth=require('./auth');

exports.protect=auth.protect(Participant);
exports.setworkshopParticipantID=(req,res,next)=>{
    if(!req.body.workshop)  req.body.workshop=req.params.workshopID;
    if(!req.body.leader) req.body.leader=req.user.id;
    ///console.log(req.body.workshopID)
    next();
}
exports.setLeaderID=(req,res,next)=>{
    if(!req.body.leader) req.body.leader=req.user.id;
    ///console.log(req.body.workshopID)
    next();
}
exports.setworkshopID=(req,res,next)=>{
    if(!req.body.workshop)  req.body.workshop=req.params.workshopID;
    next();
}
//handleCRUD.createOne(Team);
exports.createTeam=catchAsync(async (req,res,next)=>{
    const user=await Team.findOne({leader:req.user.id,workshop:req.params.workshopID});
    console.log(user)
    if(user){
        console .log('foud')
        return next(new AppError('A user can only create one team',400))
    }
    const team=await Team.create(req.body);
    team.members.push(req.user.id);
    team.save();
    res.status(201).json({
        status:'success',
        //message:"go"
        team

    })
})
exports.getAllTeams=handleCRUD.getAllDocuments(Team);
exports.getTeam=handleCRUD.getSingleDoc(Team);
exports.updateTeam=handleCRUD.updateOne(Team);
exports.deleteTeam=handleCRUD.deleteOne(Team);

// exports.setLeaderID=(req,res,next)=>{
    
//     next()
// }

exports.inviteMembers=catchAsync(async (req,res,next) =>{
   // const leader=await Team.findOne({leader:req.params.participantID});
  const leader=await Team.findOne({leader:req.user.id});
  console.log(leader)
    let unique=false,url;
    const guest=req.body.email;
 
    for(let i in leader.invite){
        if(!(leader.invite[i].email === guest)){
            console.log(leader.invite[i])
            unique=true;
        }else{
            console.log('invitation already sent')
            return next(new AppError('Invitation Already sent',400))
        }
    
    }
    console.log(unique)
    console.log(leader.invite)
    console.log(leader.members.length)
    if(leader.members.length < 4){
        if(unique){
            const inviteToken=crypto.randomBytes(32).toString('hex');  
            leader.invite.push({
                email:guest,
                inTok:crypto.createHash('sha256').update(inviteToken).digest('hex'),
                inTokExp:Date.now() + 10 * 60 *1000,
                status:'Pending'
            })
            leader.save()
            console.log(leader.leader)
            url=`${req.protocol}://${req.get(
                'host'
              )}/api/v1/participants/${leader.leader['fname']}/team/joinTeam/${inviteToken}`;         
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
            return next(new AppError(`Team size can't be greater than 3`,401))
        }
    
    }else{
        console.log('members max reached')
        return next(new AppError(`Team size can't be greater than 3`,401))
    }
   
    res.status(200).json({
        status:'success',
        leader,
        url,
        message:'An invitation link has been sent to the user'
    })

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
        email=team.invite[i].email;
        team.invite[i].inTok=undefined;
        team.invite[i].inTokExp=undefined;
        team.invite[i].status='active'

    }
}

    /**{@todo model validation failed if the user already in the team
     * how to deal with expired models and resending invitation} */
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
 if(team.members.includes(email)){
    return next(new AppError('Memeber already added to the team',400))
} else{
    team.members.unshift(participant._id);
    team.save();
} 

   
   res.status(200).json({
       status:'success',
       team
   })
  // res.redirect('/')
})