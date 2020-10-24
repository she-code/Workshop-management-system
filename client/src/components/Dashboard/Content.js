import React from 'react';
import useStyles from './DashBStyle';
import {Grid, Typography,CardActions,CardContent,Card,Button,IconButton,CardActionArea,Fab, Paper} from '@material-ui/core';
// import {PeopleAltIcon,DvrIcon,GroupWorkIcon} from '@material-ui/icons';
import GroupWorkIcon from '@material-ui/icons/GroupWork';
import DvrIcon from '@material-ui/icons/Dvr';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import LiveHelpIcon from '@material-ui/icons/LiveHelp';
import AddIcon from '@material-ui/icons/Add';
import PersonIcon from '@material-ui/icons/Person';
import classNames from 'classnames';
import Tables from './Table';
function Content() {
    const classes=useStyles();
  return (
    <div className={classes.wrapper}>
      <Paper style={{height:'100vh'}} elevation={0}>
        <div className={classes.page}>
              <div className={classes.pageIn}>
                <div className={classes.greet}>
                  <Typography variant="h6" color="textPrimary" component="h2" >HI Fre</Typography> 
                  <Typography variant="body1" color="textSecondary" component="h2" >Welcome to the workshop management system</Typography> 
                </div>
                <div>
                  <Grid container direction="row" spacing={2}>
                    <Grid item xs={12} sm={6} md={3}>
                      <Card className={classNames(classes.card1,classes.card)}>
                        <CardActionArea href='http://localhost:3000/teams'>
                          <CardContent>
                            <Typography variant="body1">Teams</Typography>
                            <Typography variant="h6" color="textPrimary">
                              <IconButton>
                                <GroupWorkIcon/>
                              </IconButton>
                                4
                            </Typography>
                          </CardContent>
                        </CardActionArea>
                      </Card>
                    </Grid>
                  
                    <Grid item xs={12} sm={6} md={3}>
                      <Card className={classNames(classes.card2,classes.card)}>
                        <CardActionArea href='#'>
                          <CardContent>
                              <Typography variant="body1">Projects</Typography>
                                <Typography variant="h6" color="textPrimary">
                                  <IconButton>
                                    <DvrIcon/>
                                  </IconButton>
                                    12
                              </Typography>
                            </CardContent>
                            
                        </CardActionArea>
                          
                      </Card>
                    </Grid>

                    <Grid item xs={12} sm={6} md={3}>
                      <Card className={classNames(classes.card3,classes.card)}>
                        <CardActionArea href='#'>
                          <CardContent>
                            <Typography variant="body1">Advisors</Typography>
                                <Typography variant="h6" color="textPrimary">
                                  <IconButton>
                                    {/* <PeopleAltIcon/> */}
                                    <PersonIcon/>
                                  </IconButton>
                                    12
                              </Typography>
                          </CardContent>
                        </CardActionArea>  
                      </Card>
                    </Grid>

                    <Grid item xs={12} sm={6} md={3}>
                      <Card className={classNames(classes.card4,classes.card)}>
                          <CardActionArea href='#'>
                            <CardContent>
                              <Typography variant="body1">Pending Requests</Typography>
                                  <Typography variant="h6" color="textPrimary">
                                    <IconButton>
                                      <LiveHelpIcon/>
                                    </IconButton>
                                      12
                                </Typography>
                            </CardContent>
                          </CardActionArea>
                      </Card>
                    </Grid>
                    
                  </Grid>
                </div>
              </div>
          </div>
          <Fab color="primary" aria-label="add" className={classes.fab}>
            <AddIcon />
          </Fab>
          <Tables/>
      </Paper>
        
    </div>
  );
}


export default Content;
