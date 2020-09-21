const GoogleStrategy=require('passport-google-oauth20');
const mongoose=require('mongoose');
const User=require('../models/User');

module.exports=function(passport){

    passport.use(new GoogleStrategy ({
        clientID:process.env.Oauth_client_Id,
        clientSecret:process.env.Oauth_Clinet_Secret,
        callbackURL:'/api/v1/auth/google/callback'
    },
    async (accessToken,refreshToken,profile,done) =>{
        console.log(profile)
       const newUser={
           googleId:profile.id,
           displayName:profile.displayName,
           firstName:profile.name.givenName,
           lastName:profile.name.familyName,
           image:profile.photos[0].value
       }
       try {
           let user=await User.findOne({googleId:profile.id})
           if(user){
               done(null,user)
           }
           else{
               user=await User.create(newUser)
               done(null,user)
               console.log(user)
           }
       } catch (error) {
           console.error(error)
       }
    }))

    passport.serializeUser( (user,done) =>done(null,user.id))

    passport.deserializeUser( (id,done)=> {
        User.findById(id, (err,user) =>  done(err,user)
        )
    })
}