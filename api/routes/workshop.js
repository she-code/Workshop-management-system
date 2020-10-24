const express = require('express');

const workshopController = require('../controllers/workshop');
const projectRoute=require('../routes/project');
const participantRoute=require('../routes/participants');
const teamRoute=require('./team');
const router = express.Router();

//post workshop/id/projects get all projects
router.use('/:workshopID/projects', projectRoute);
router.use('/:workshopID/teams', teamRoute);
router.use('/:workshopID/participants', participantRoute);
router
.route('/')
.get(workshopController.getAllworkshops)
.post(workshopController.createWorkshop);

router.route('/:id').patch(workshopController.updateWorkshop).delete(workshopController.deleteWorkshop).get(workshopController.getWorkshop)
module.exports = router;
