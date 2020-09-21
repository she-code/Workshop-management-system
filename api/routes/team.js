const express=require('express');
const teamConroller=require('../controllers/team');

const router=express.Router({mergeParams:true});

router.route('/').get(teamConroller.getAllTeams).post(teamConroller.setLeaderID,teamConroller.createTeam);
router.route('/joinTeam/:token').post(teamConroller.joinTeam)
router.route('/inviteTeam').post(teamConroller.inviteMembers)

module.exports=router;