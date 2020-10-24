import React,{useState,useEffect} from 'react';
import socketIOClient from 'socket.io-client';


   let socket;
const Header = () => {
    const endPoint = `http://localhost:8000/`;
    socket = socketIOClient(endPoint);
    const [task,setTasks] = useState([]);
   // const perticipant = socket('/participat')
   const getData = tasks =>{
       let task = tasks.map(t => {
           return t;
       })
       setTasks(task)
   }
   useEffect(() => {
      // socket.close();
       socket.emit('initial_data')
       socket.on('get_data',getData)
       return (()=>{
        socket.off("get_data");
      })
   },[])
   //console.log({task})

  return (
    <div>
    <h1>h</h1>
    <div>
        {Object.keys(task).map( (tk)=> {
              return <div key={task[tk]._id}>
                 <span>"Name is:"{task[tk].title}</span>
                 <span>"Name is:"{task[tk].visibility}</span>
              </div>
            })}
    </div>
    </div>
    
  );
}

export {Header,socket};
