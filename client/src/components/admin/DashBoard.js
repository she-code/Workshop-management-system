import React, { useState } from 'react';
import {Grid,Paper,Switch,Box} from '@material-ui/core';
import useStyles from './DashBstyle';
import {ThemeProvider,createMuiTheme} from '@material-ui/core/styles';
import Content from './Dashboard/Content/Content';
function DashBoard() {
  const classes=useStyles();
  const [darkmode,setDarkmode]=useState(false);
  const theme=createMuiTheme({
    palette:{
      type: darkmode ? 'dark' :'light',
    }
  })
 

  return (
    <ThemeProvider theme={theme}>
      <Box style={{height:'100vh'}}>
        <Grid container direction="row" className={classes.container}>
            <Grid item  xs={0} sm={2} className={classes.aside}>Aside</Grid>
            <Grid item container xs={12} sm={10} direction="column" className={classes.content}>
                <Grid item>Header</Grid>
                <Grid item><Content/></Grid>
            </Grid>
          
        </Grid>
        <Switch checked={darkmode} onChange={()=>setDarkmode(!darkmode)}/>
   </Box>
    </ThemeProvider>
   
   
  );
}

export default DashBoard;
