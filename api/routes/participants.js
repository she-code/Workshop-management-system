const express=require('express');
const participantContoller=require('../controllers/participants');
const authController=require('../controllers/auth');
const projectRoute=require('./project');
const teamRoute=require('../routes/team');
const tasksRoute = require('../routes/tasks');

const router=express.Router({ mergeParams: true });
//{ mergeParams: true }
router.use('/:participantID/project',projectRoute);
router.use('/:participantID/team',teamRoute);
router.use('/:participantID/tasks',tasksRoute);

router.route('/')
.get(participantContoller.getAllParticipants)
.post(participantContoller.setworkshopID,participantContoller.addParticipant);
router.route('/login').post(participantContoller.login);

router.route('/:id').get(participantContoller.getParticipant).patch(participantContoller.updateParticipant).delete(participantContoller.deleteParticipant);

module.exports=router;