import React from 'react';
import {Card,CardContent} from '@material-ui/core';
import Schedule from './Schedule';
const Schedules = () => {
  return (
    <Card>
      <CardContent>
        <Schedule/>
        <Schedule/>
      </CardContent>
    </Card>
  );
}

export default Schedules;
