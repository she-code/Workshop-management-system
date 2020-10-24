const express=require('express');
const teamContoller=require('../controllers/team');
const auth=require('../controllers/auth');

const router=express.Router({mergeParams:true});

router.use(teamContoller.protect)
router.route('/').get(teamContoller.getAllTeams).post(teamContoller.setworkshopParticipantID,teamContoller.createTeam);
router.route('/joinTeam/:token').post(teamContoller.joinTeam)

router.route('/inviteTeam').post(teamContoller.setLeaderID,teamContoller.inviteMembers)
router.route('/:id').get(teamContoller.getTeam).patch(auth.restrictTo('leader'),teamContoller.updateTeam).delete(auth.restrictTo('leader'),teamContoller.deleteTeam)
module.exports=router;
//auth.restrictTo('leader'),