import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Card,CardHeader,CardContent,Avatar,Tooltip,Grid, CardActionArea, Typography,Link,Button} from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import { red } from '@material-ui/core/colors';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import classNames from 'classnames';
import GroupAvator from '../Teams/GroupAvator';

import moment from 'moment';
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
      margin:'16px'

  },
  link:{

  },
  small: {
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
  corner:{
      padding:'24px'
  }

}));

const useStylesBootstrap = makeStyles((theme) => ({
    arrow: {
      color: theme.palette.common.black,
    },
    tooltip: {
      backgroundColor: theme.palette.common.black,
    },
   
  }));
  
function BootstrapTooltip(props) {
    const classes = useStylesBootstrap();
  
    return <Tooltip arrow classes={classes} {...props} />;
  }
  
 function Project() {
  const classes = useStyles();
 
  return (
    <Card className={classNames(classes.root,classes.grids)}>
      <CardHeader
       
        action={
            <BootstrapTooltip title="" style={{fontSize:'20px'}}>
            <IconButton aria-label="chat">
                <MoreVertIcon />
            </IconButton>
            </BootstrapTooltip>
        }
        title={<BootstrapTooltip title="Deadline" placement="bottom-start"><Typography component="h6" variant="body2">{moment().format('d MMMM y')}</Typography></BootstrapTooltip>}
        subheader=""

      />
     
    <CardContent style={{padding:'0'}}>
        <Grid container direction='column'   justify="center" alignItems="center">
            <Grid item>
                <a href='#'><Avatar variant="rounded">N</Avatar></a>
            </Grid>
            <Grid item  style={{textAlign:'center'}}>
                <Typography component='h6' variant='body1'>
                    <Link href="#">Project name</Link>
                </Typography>
                <Typography component='subtitle2' variant='body2' color="textSecondary">
                    <span>Progress in 45%- Last updated 3h</span>
                </Typography>
            </Grid>
            <Grid item className={classes.members}>
                <GroupAvator className={classes.small}/>
            </Grid>
        </Grid>
        <Grid container direction="row" justify="space-around"  alignItems="center">
        <Grid item className={classes.corner}>
                Advisor
            </Grid>
            <Grid item className={classes.corner}>
                Tasks
            </Grid>
        </Grid>
    </CardContent>  
    </Card>
  );
}

export default Project;
