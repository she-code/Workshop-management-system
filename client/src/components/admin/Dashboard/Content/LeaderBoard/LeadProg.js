import React from 'react';
import {HorizontalBar} from 'react-chartjs-2';

const arbitraryStackKey = "stack1";
const data = {
  labels: ['a', 'b', 'c', 'd', 'e'],
  datasets: [
    // These two will be in the same stack.
    {
      stack: arbitraryStackKey,
      label: 'Active',
      data: [1, 2, 3, 4, 5],
      backgroundColor: 'rgba(75,192,192,1)',
      borderColor: 'rgba(0,0,0,1)',
    },
    {
      stack: arbitraryStackKey,
      label: 'Completed',
      data: [5, 4, 3, 2, 1],
      backgroundColor: 'rgba(75,192,85,1)',
      borderColor: 'rgba(0,0,0,1)',   
    },
    {
        stack: arbitraryStackKey,
        label: 'Overdue',
        data: [5, 4, 3, 2, 1],
        backgroundColor: 'rgba(75,0,0,1)',
        borderColor: 'rgba(0,0,0,1)',   
      }
  ]
}
const options={
  responsive: true,
    title:{
      display:true,
      text:'Task',
      fontSize:15
    },
    legend:{
      display:true,
      position:'top'
    },
    scales: {
        yAxes: [{
        //   ticks: {
        //     beginAtZero: true
        //   },
         // ticks: { display: false } ,
          gridLines: { drawBorder: false, }
        }],
        xAxes: [{
          stacked: true,
        //   barShowLabels: false,
          ticks: { display: false } 
        }]
      }
  }

const LeadProg =() =>{
    return (
      <div>
        <HorizontalBar
          data={data}
          options={options}
        />
      </div>
    );
  }
  export default LeadProg;