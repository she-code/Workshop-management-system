const express=require('express');
const advisorController=require('../controllers/advisorController');

const router=express.Router({ mergeParams: true });

//// /api/v1/projects/projectID/advisors

router 
.route('/')
.get(advisorController.getAllAdvisors)
.post(
    advisorController.setProjectId,
    advisorController.createAdvisor)

module.exports=router;