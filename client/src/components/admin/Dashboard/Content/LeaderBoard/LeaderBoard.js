import React from 'react';
import {Card,CardContent,Typography,Grid} from '@material-ui/core';

import LeadProg from './LeadProg';


const LeaderBoard = () => {
  return (
    <Card>
        <CardContent>
          <Grid container direction="column">
            <Grid item>
              <Typography>Leaderboard</Typography>
            </Grid>                    
            <Grid item>
              <LeadProg/>
            </Grid>
          </Grid>
        </CardContent>

    </Card>
  );
}

export default LeaderBoard;


