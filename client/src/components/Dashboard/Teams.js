import React,{useEffect,useState} from 'react';
import {Card,CardActionArea,Typography,CardContent, Button} from '@material-ui/core';
import axios from 'axios';
import Team from './Team';
import Tables from './Table';
function Teams() {
  const [teams,setTeams]=useState([]);

  useEffect(()=>{getTeams();},[])
    const getTeams=async (e)=>{
      //e.preventDefault();
       try{ 
           let res=await axios.get('http://localhost:5000/api/v1/team');
           setTeams(res.data['data']['allDocs'])
           console.log(res.data['data']['allDocs'])
           console.log(res.data['results'])
           console.log(res.data)
          }
          catch (err){ // Catches if there is any error
            alert(err)
            console.log(err.response.data)
          };}
    
         
  return (
    <div>
      <form onSubmit={getTeams}>
        {/* <input type="text" name="get"/> */}
        <Button type='submit'>Click</Button>
      </form>
       <Card >
            <CardActionArea href='#'>
                <CardContent>
                    <Typography variant="body1">Teams</Typography>
                    <Typography variant="h6" color="textPrimary">
                              4
                               
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
        {/* <Team/> */}
        {teams.map(team=>(
          <Team name={team.name} leader={team['leader']} members={team.members} />

        ))}
    </div>
  
  );
}


export default Teams;
