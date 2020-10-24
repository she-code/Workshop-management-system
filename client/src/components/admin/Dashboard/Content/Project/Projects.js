import React from 'react';
import {Grid} from '@material-ui/core';
import Project from './Project';
const Projects = () => {
    const array = [1,2,3,4,5,6,7,8,9,10]
  return (
    <Grid container direction='row' alignItems="stretch" spacing={3}>
        {
            array.map(project =>(
                <Grid item xs={12} sn={6} md={4} lg={3} style={{display:'flex'}}>
                    <Project/>
                 </Grid>
            ))
        }
       
    </Grid>
  );
}

export default Projects;
