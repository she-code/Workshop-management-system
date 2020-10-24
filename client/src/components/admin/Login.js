import React,{Fragment,useState} from 'react';
import clsx from 'clsx';
import axios from 'axios';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import { Button,Grid,TextField,Container,Input,InputAdornment,IconButton,InputLabel,FormControl } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
        width: '100%',
        
      },
    },
    container:{
      boxShadow:' #101fd754 0px 10px 20px',
      borderBottomLeftRadius: '40px',
      borderTopRightRadius: '40px',
      padding:'30px',
      marginTop:'200px',
      
    }
  }));

function Login() {
  const [values, setValues] = useState({
    email: '',
    password: '',
    showPassword: false,
  });

    const classes = useStyles();
    const handleClickShowPassword = () => {
      setValues({ ...values, showPassword: !values.showPassword });
    };
  
    const handleMouseDownPassword = (event) => {
      event.preventDefault();
    };
  
    const handleChange = (prop) => (event) => {
      setValues({ ...values, [prop]: event.target.value });
      console.log({values})
    };
  
    const {email,password}=values;
    const handleSubmit=async (e)=>{
      e.preventDefault();
      if(!email || !password){
        console.log('Please enter the values');
      }else{

        axios.post('http://localhost:8000/api/v1/admin/login',{
        email:email,
        password:password,
      } ) 
      .then((res)=>{ 
        console.log({email,password})
        console.log(res)
      })
      .catch(err=>{ // Catches if there is any error
        alert(err)
        console.log(err.response.data)
      });
    }
   
  }
  return (
  
    <Container maxWidth="sm" className={classes.container}>
      <form className={classes.root} noValidate autoComplete="off" onSubmit={handleSubmit}>
          <TextField id="standard-basic" label="Email"  onChange={handleChange('email')} value={values.email}/>
          <FormControl className={clsx(classes.margin, classes.textField)}>
          <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
          <Input
            id="standard-adornment-password"
            type={values.showPassword ? 'text' : 'password'}
            value={values.password}
            onChange={handleChange('password')}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                >
                  {values.showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            }
          />
       </FormControl> 
      <Button variant="contained" color="secondary" type="submit">
        Login
      </Button>

      </form>
    </Container>
  );
}

export default Login;
