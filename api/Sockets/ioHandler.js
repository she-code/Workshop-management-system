const Task = require('../models/Task');
const taskController = require('../controllers/task');

module.exports = (io) => {
    io.sockets.on('connection', (socket) => {
        console.log(`New user connected ${socket.id}`)
       // io.of('participant').on('connection', (socket)=>{
         //   console.log('the tournament will start soon')
            socket.on('initial_data',async () =>{
                const tasks = await Task.find();
                // console.log(tasks)
                socket.emit('get_data',tasks)
                //socket.
            })
            socket.on('delete',taskController.createTask)
        });
    //})}
}