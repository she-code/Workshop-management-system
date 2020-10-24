import {makeStyles} from '@material-ui/styles';

const useStyles=makeStyles((theme) =>({
   
    container:{
       height:'100vh'
    },
    content:{
        minHeight:' calc(100vh - 3.5rem)'
    },
    aside:{
        color: 'inherit',
        backgroundColor:'#f6f7f9',
        display: 'none',
        [theme.breakpoints.up('sm')]: {
        display: 'block',
        },
        
    },
    wrapper:{
        backgroundColor:'#f8f9fc',
        minHeight:' calc(100vh - 3.5rem)',
        color:'#5a5c69!important'
    },
    page:{
        padding:'1.5rem'
    },
    username:{
        color:'#5a5c69!important'
    },
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
    greet:{
        marginBottom:'1.5rem'
    },
    shadow:{
        boxShadow:'0 .15rem 1.75rem 0 rgba(58,59,69,.15)!important'
    },
    fab: {
        margin: theme.spacing.unit, // You might not need this now
        position: "fixed",
        bottom: theme.spacing(2),
        right: theme.spacing(2),
      },
    
      esti:{
          color:'#fafafa'
      }

}));

export default useStyles;