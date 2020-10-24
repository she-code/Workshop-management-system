const express = require('express');
const morgan = require('morgan');
const cors = require("cors");
const passport=require('passport');
const session=require('express-session');
const MongoStore=require('connect-mongo')(session)
const mongoose=require('mongoose');

const adminRoute = require('./routes/admin');
const workshopRoute = require('./routes/workshop');
const projectsRpute = require('./routes/project');
const participantsRoute=require('./routes/participants');
const advisorRoute=require('./routes/advisor');
const authRoute=require('./routes/auth');
const teamRoute=require('./routes/team');
const globalErrorHandler=require('./controllers/error');
const taskRoute = require ('./routes/tasks');

const {ensureAuth,ensureGuest} =require('./controllers/authorize');


//Passport config
require('./controllers/passport')(passport)
const app = express();

console.log(process.env.NODE_ENV);



if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use((req,res,next)=>{
    res.header('Access-Control-Allow-Origin','*');
    res.header('Access-Control-Allow-Headers',"Origin,X-Requested-With,Content-Type,Accept,Authorization");
     if(req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods','GET,PUT,POST,PATCH,DELETE');
        return res.status(200).json({});

   }
    next();
});


var corsOptions = {
  origin: "http://localhost:3000"
};

app.use(cors());
app.use(express.json());

///Session middelware
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false,
  //cookie: { secure: true }
  store:new MongoStore({mongooseConnection:mongoose.connection})
  
}))
///passport middelware
app.use(passport.initialize())
app.use(passport.session())

app.get("/",ensureGuest ,(req, res) => {
  res.send(`    <a href="api/v1/auth/google" class="btn red darken-1">
  <i class="fab fa-google left"></i> Log In With Google
</a>`)
});

app.get("/dashboard", ensureAuth,(req, res) => {
  res.json({
    message: "dashboard.",
    name:req.user.firstName
  });
  //console.log(req.user)
});

app.use('/api/v1/admin', adminRoute);
app.use('/api/v1/workshops', workshopRoute);
app.use('/api/v1/projects', projectsRpute);
app.use('/api/v1/participants',participantsRoute);
app.use('/api/v1/advisor',advisorRoute);
app.use('/api/v1/auth',authRoute);
app.use('/api/v1/team',teamRoute);
app.use('/api/v1/tasks',taskRoute);


//error when the route is not ready
app.use('*',(req,res,next)=>{
  console.log('Route is not ready');
  next();
})


app.use(globalErrorHandler);






module.exports = app;