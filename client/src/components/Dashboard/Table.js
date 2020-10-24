import React,{useState,useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import {Container,TableRow,TableHead,TableContainer,TableCell,TableBody,Table,Link,Typography} from '@material-ui/core';
const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});
export default function Tables() {
  const classes = useStyles();
  const [teams,setTeams]=useState([]);

  // useEffect(()=>{getTeams();},[])
  //   const getTeams=async (e)=>{
  //     //e.preventDefault();
  //      try{ 
  //          let res=await axios.get('http://localhost:8000/api/v1/team');
  //          setTeams(res.data['data']['allDocs'])
  //          console.log(res.data['data']['allDocs'])
  //          console.log(res.data['results'])
  //          console.log(res.data)
           
  //         }
  //         catch (err){ // Catches if there is any error
  //           alert(err)
  //           console.log(err.response.data)
  //         };}
    

  return (
    <TableContainer component={Container}>
      <Table className={classes.table} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="right">Members</TableCell>
            <TableCell align="right">Project</TableCell>
            <TableCell align="right">Leader</TableCell>
            <TableCell align="right">Advisor</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {/* {teams.map((team) => (
            <TableRow key={team._id}>
              <TableCell component="th" scope="row">
                <Link href="/team/:id">{team.name}</Link>
              </TableCell>
              <TableCell align="right"><Link href="/team/:id" >{team.members.length}</Link></TableCell>
              <TableCell align="right"><Link href="/team/:id">{team.members.length}</Link></TableCell>
              <TableCell align="right"><Link href="/team/:id">{team.leader['fname']} {team.leader['lname']}</Link></TableCell>
              <TableCell align="right"><Link href="/team/:id">{team.leader['fname']} {team.leader['lname']}</Link></TableCell>
            </TableRow>
          ))} */}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

