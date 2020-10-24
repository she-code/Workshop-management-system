import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Card,CardHeader,CardContent,Avatar,Tooltip,Grid, CardActionArea, Typography,Link} from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import { red } from '@material-ui/core/colors';
import ForumIcon from '@material-ui/icons/Forum';
import GroupAvator from './GroupAvator';
import classNames from 'classnames';
const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
 
  avatar: {
    backgroundColor: red[500],
  },
  grids:{
    display: 'flex', 
    justifyContent: 'space-between', 
    flexDirection: 'column',
    borderRadius:'0',
    width:'100%'
  },
  cardActionarea:{
    flexGrow: 1,
    flexDirection: 'column',
    alignItems: 'stretch',
  },
  members:{
      paddingLeft:'16px',
      margin:'16px'

  },
  link:{

  }

}));

 function Team() {
  const classes = useStyles();
 
  return (
    <Card className={classNames(classes.root,classes.grids)}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            R
          </Avatar>
        }
        action={
            <Tooltip title="Chat with team" style={{fontSize:'20px'}}>
            <IconButton aria-label="chat">
                <ForumIcon />
            </IconButton>
            </Tooltip>
        }
        title={<Typography component="h6" variant="subtitle1">Team name</Typography>}
        subheader=""

      />
     
    <CardContent style={{padding:'0'}}>
        <Typography color="textSecondary" component='h3'variant='body1' style={{paddingLeft:'16px'}}>
            <span>Leader </span>
            <Link href="#" >
                Fre
            </Link>          
        </Typography>
        <div className={classes.members}>
            <GroupAvator/>
        </div>
        
      <Grid container direction="row" alignItems="stretch">
      <Grid item xs={4} style={{display: 'flex'}}>
            <Card variant="outlined" className={classes.grids}>              
                <CardActionArea href='#' className={classes.cardActionarea}>
                        <CardContent>
                            <Typography variant="body2" component='subtitle1'color="textSecondary" >
                                <span>Tasks Tasks Tasks Tasks Tasks</span>
                                <span>65</span>
                            </Typography>
                        </CardContent>
                </CardActionArea>                  
            </Card>
          </Grid>
          <Grid item xs={4} style={{display: 'flex'}}>
            <Card variant="outlined" className={classes.grids}>              
                <CardActionArea href='#' className={classes.cardActionarea}>
                        <CardContent>
                            <Typography variant="body2" component='subtitle1' color="textSecondary" >
                                <span>Tasks </span>
                                <span>65</span>
                            </Typography>
                        </CardContent>
                </CardActionArea>                  
            </Card>
          </Grid>
          <Grid item xs={4} style={{display: 'flex'}}>
            <Card variant="outlined" className={classes.grids}>              
                <CardActionArea href='#' className={classes.cardActionarea}>
                        <CardContent>
                            <Typography variant="body2" component='subtitle1' color="textSecondary" >
                                <span>Tasks </span>
                                <span>65</span>
                            </Typography>
                        </CardContent>
                </CardActionArea>                  
            </Card>
          </Grid>
      </Grid>
    </CardContent>  
    </Card>
  );
}

export default Team;
