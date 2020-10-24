import React from 'react';
import {Grid, Typography,CardContent,Card,IconButton,CardActionArea} from '@material-ui/core';
import GroupWorkIcon from '@material-ui/icons/GroupWork';
import DvrIcon from '@material-ui/icons/Dvr';
import LiveHelpIcon from '@material-ui/icons/LiveHelp';
import PersonIcon from '@material-ui/icons/Person';
import classNames from 'classnames';
import useStyles from './NavStyle';
const Nav = () => {
    const classes=useStyles();
  return (
    <>
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
    </>
  );
}

export default Nav;
