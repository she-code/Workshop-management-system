import {makeStyles}  from '@material-ui/styles';

const useStyles=makeStyles((theme) =>({


    card:{       
        textAlign:'center',
        boxShadow:'0 .15rem 1.75rem 0 rgba(58,59,69,.15)',
        [theme.breakpoints.down('sm')]: {
            boxShadow: '0 .15rem .75rem 0 rgba(58,59,69,.15)'
            },
    },
    card1:{
        borderLeft:'.25rem solid #4e73df!important',
        color:'#4e73df',
    },
    card2:{
        borderLeft:'.25rem solid #1cc88a!important',
        color:'#1cc88a',

    },
    card3:{
        borderLeft:'.25rem solid #36b9cc!important',
        color:'#36b9cc',

    },
    card4:{
        borderLeft:'.25rem solid #f6c23e!important',
        color:'#f6c23e',

    },
}));

export default useStyles;