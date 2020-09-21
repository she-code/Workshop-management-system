const express=require('express');
const participantContoller=require('../controllers/participants');
const authController=require('../controllers/auth');
const projectRoute=require('./project');
const teamRoute=require('../routes/team');

const router=express.Router();
//{ mergeParams: true }
router.use('/:participantID/project',projectRoute);
router.use('/:participantID/team',teamRoute);

router.route('/')
.get(participantContoller.getAllParticipants)
.post(participantContoller.setworkshopID,participantContoller.addParticipant);
router.route('/login').post(participantContoller.login);
router.route('/inviteMembers').post(participantContoller.inviteMembers);
module.exports=router;