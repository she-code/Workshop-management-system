const express = require('express');
const projectContoller = require('../controllers/projects');
const advisorRoute=require('./advisor');
const { setProjectId } = require('../controllers/advisorController');

const router = express.Router({ mergeParams: true });

//// /api/v1/projects/projectID/advisors
//router.use('/:projectID/advisors',advisorRoute);

router.route('/')
.get(projectContoller.getAllProjects)
.post(
    projectContoller.setWorkshopIds,
    projectContoller.createProject)
.patch(projectContoller.setUserId,projectContoller.chooseProject)
router.route('/chooseProject').post(projectContoller.setUserId,projectContoller.chooseProject);
module.exports = router;