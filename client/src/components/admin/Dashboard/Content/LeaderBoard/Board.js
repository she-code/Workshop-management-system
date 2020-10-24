import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';
import LeadProg from './LeadProg';
import LeaderBoard from './LeaderBoard';

const BorderLinearProgress = withStyles((theme) => ({
  root: {
    height: 15,
    borderRadius: 5,
  },
  colorPrimary: {
    backgroundColor: theme.palette.grey[theme.palette.type === 'light' ? 200 : 700],
  },
  bar: {
    borderRadius: 5,
    backgroundColor: '#1a90ff',
  },
}))(LinearProgress);

const Board = () => {
  return (
    <div>
      <BorderLinearProgress variant="determinate" value={50} />
      {/* <LeadProg/> */}
    </div>
  );
}

export default Board;
