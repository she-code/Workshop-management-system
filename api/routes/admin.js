const express = require('express');
const adminController = require('../controllers/admin');
const authContoller=require('../controllers/auth');

const router = express.Router();

router.post('/login',adminController.login)
//router.use(adminController.protect)
//router.use(authContoller.restrictTo('admin'))
router.route('/').get(adminController.getAllAdmins).post(adminController.addAdmin)

router.route('/:id').get(adminController.getAdmin).patch(adminController.updateAdmin).delete(adminController.deleteAdmin);

module.exports = router;