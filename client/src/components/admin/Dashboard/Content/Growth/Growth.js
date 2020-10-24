import React from 'react';
import {Card,CardContent} from '@material-ui/core';
import {Line} from 'react-chartjs-2';

const state = {
  labels: ['January', 'February', 'March',
           'April', 'May'],
  datasets: [
    {
      label: 'Rainfall',
      fill:false,
      lineTension: 0.5,
      backgroundColor: 'rgba(75,192,192,1)',
      borderColor: 'rgba(0,0,0,1)',
      borderWidth: 2,
      data: [5,20,45,5,10]
    }
  ]
}
const options = {
  responsive: true,
  title: {
    display: true,
    text:'Average Teams progress per month',
    fontSize:18
  },
  tooltips: {
    mode: 'nearest'
},
scales: {
  yAxes: [{
      ticks: {
          max: 100,
          min: 5,
          stepSize: 25
      }
  }]
}

  // legend:{
  //       display:true,
  //       position:'right'
  //       }
  // tooltips: {
  //   mode: 'label'
  // },
  // hover: {
  //   mode: 'dataset'
  // },
 
}

const Growth = () => {
  return (
    <Card>
        <CardContent>
            <Line
            data={state}
            options={options}
            />
        </CardContent>
       
      </Card>
  );
}

export default Growth;
