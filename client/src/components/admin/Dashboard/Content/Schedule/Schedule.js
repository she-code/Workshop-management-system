import React from 'react';
import { Typography,Checkbox} from '@material-ui/core';
import moment from 'moment';
const Schedule = () => {
  return (
    <div>
        <div>
            {moment().format('D MMMM, YYYY')}
        </div>
        <Typography>
            <Checkbox
                inputProps={{ 'aria-label': 'primary checkbox' }}
            />fre
        </Typography>
        <div style={{float:"right"}}>
            {moment().format('h m A')}
        </div>
    </div>


  );
}

export default Schedule;
