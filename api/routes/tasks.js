const express =require('express');
const taskController = require('../controllers/task');

const router=express.Router();

router.route('/').post(taskController.protect,taskController.setParticipantId,taskController.createTask).get(taskController.viewPublicTask)
router.route('/:id').get(taskController.getTask).patch(taskController.updateTask).delete(taskController.protect,taskController.deleteTask1)
router.route('/user/:participantId').get(taskController.getUserTasks)
module.exports = router;