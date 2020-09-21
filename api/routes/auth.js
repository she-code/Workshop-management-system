const express=require('express');
const passport = require('passport');
const {ensureAuth,ensureGuest} =require('../controllers/authorize');

const router=express.Router();

/// @desc auth with google
// @route Get api/v1 /auth /google
router.get('/google',passport.authenticate('google',{scope:['profile','email']}))

/// @desc  google auth callback
// @route Get api/v1 /auth /google/callback
router.get('/google/callback',passport.authenticate('google',{failureRedirect:'/'}),(req,res)=>{
    //if success full 
    res.redirect('/dashboard')
})

/// @desc  google auth callback
// @route Get api/v1 /auth /logout
router.get('/logout',(req,res,next) =>{
    req.logOut()
    res.redirect('/')
})
module.exports=router;