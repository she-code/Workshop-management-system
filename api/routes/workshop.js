const express = require('express');

const workshopController = require('../controllers/workshop');
const projectRoute=require('../routes/project');
const participantRoute=require('../routes/participants');

const router = express.Router();

//post workshop/id/projects get all projects
router.use('/:workshopID/projects', projectRoute);
//router.use('/:workshopID/participants', participantRoute);
router
.route('/')
.get(workshopController.getAllworkshops)
.post(workshopController.createWorkshop);

module.exports = router;