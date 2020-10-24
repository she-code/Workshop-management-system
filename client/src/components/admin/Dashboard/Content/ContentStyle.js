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
      },
      lead:{
          height:'100%'
      }

}));

export default useStyles;