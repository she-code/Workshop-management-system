const mongoose = require('mongoose');
const dotenv = require('dotenv');
const http = require('http');
dotenv.config({
    path: './api/.env'
});
const app = require('./app');
const server =  http.createServer(app);
const io = require('socket.io')(server);
//  we will load the io-handler module and will attach the connection listeners
require('./Sockets/ioHandler')(io);

const port = process.env.PORT || 3000;

process.on('uncaughtException', (err) => {
    // console.log(c)
     console.log('solving uncaught error');
     console.log(err.name, err.message, err.stack);
   
     process.exit(1);
   });
   

//connection
mongoose.connect(process.env.MONGO_URL, {
    useCreateIndex: true,
    useUnifiedTopology: true,
    useNewUrlParser: true
}).then((con) => console.log('connected')).catch((err) => {
    console.log(err.message);
    throw err;
})



server.listen(port, () => {
    console.log('Server running on ', port)
})

process.on('unhandledRejection', (err) => {
    //mongo connection example
    console.log('solving unhandled promise error');
    console.log(err.name, err.message, err.stack);
    //gives the server a time to close all the pending reqs
    server.close(() => {
      process.exit(1);
    });
  });
  
module.exports =io;