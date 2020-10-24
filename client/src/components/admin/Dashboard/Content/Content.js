import React from 'react';
import useStyles from './ContentStyle';
import {Typography,Fab, Paper,Grid} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import Nav from './Nav/Nav';
import Growth from './Growth/Growth';
import LeaderBoard from './LeaderBoard/LeaderBoard';
import ProjectPro from './Project/PrjectPro';
import Schedules from './Schedule/Schedules';
function Content() {
    const classes=useStyles();
  return (
    <div className={classes.wrapper}>
      <Paper style={{height:'100vh'}} elevation={0}>
        {/* <div className={classes.page}>    */}
         
          {/* <Fab color="primary" aria-label="add" className={classes.fab}>
            <AddIcon />
          </Fab>
          {/* <Tables/> */}
          
        <Grid container direction="column">
            <Grid item>
              <div className={classes.pageIn}>
                    <div className={classes.greet}>
                      <Typography variant="h6" color="textPrimary" component="h2" >HI Fre</Typography> 
                      <Typography variant="body1" color="textSecondary" component="h2" >Welcome to the workshop management system</Typography> 
                    </div>
              </div>
            </Grid>
            <Grid item>
              <Nav/>
            </Grid>
            <Grid item container direction="row" spacing={2}>
              <Grid item xs={12} md={7}>
                <Growth/>
                {/* Line 1 */}
              </Grid>
              <Grid item xs={12} md={5} className={classes.lead}>
                <LeaderBoard/>
              </Grid>
            </Grid>
            <Grid item container direction="row">
            <Grid item xs={12} md={5} >
                <ProjectPro/>
              </Grid>
              <Grid item>
                <Schedules/>
              </Grid>
            </Grid>
        </Grid>  
        {/* </div> */}
      </Paper>
        
    </div>
  );
}


export default Content;
