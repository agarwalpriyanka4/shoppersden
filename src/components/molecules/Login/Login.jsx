import React, { useEffect } from 'react';
import { Box, Button, TextField} from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LockIcon from '@mui/icons-material/Lock';
import * as Yup from 'yup';
import { useFormik } from 'formik'; 
import Alert from '@mui/material/Alert';
import CheckIcon from '@mui/icons-material/Check';
import Snackbar from '@mui/material/Snackbar';
import { Form } from 'formik';
import { useDispatch,useSelector } from 'react-redux';
import './Login.css';
import { useNavigate } from 'react-router-dom';
import { loginRequest } from '../../../redux/actions/loginActions.jsx';
import { useAuth } from '../AuthProvider/AuthProvider.jsx';


function Login({newUserState, isLoggedInState}) {
  const dispatch=useDispatch();
  const {logging,loggingSuccess,loggingError,loggingData}=useSelector((state)=>state.loginState);
const {login}=useAuth();
  /* const[userName,setUserName]=React.useState("");
  const[password,setPassword]=React.useState(""); */
  const[open,setOpen]=React.useState(false);
  const[showAlert,setShowAlert]=React.useState(true);
  const navigate = useNavigate();

  const validationSchema=Yup.object({
    userName:Yup.string().required("UserName is required"),
    password:Yup.string().required("Password is required")
  })

  function handleNewUser(event){
    event.preventDefault();
    newUserState(true);
  }
  const formik=useFormik({
    initialValues:{
      userName:"",
      password:""
    },
    validationSchema:validationSchema,
    onSubmit:(values)=>{
      console.log("Form data",values);
      console.log("API URL:",import.meta.env.VITE_API_URL);
      const api_url=import.meta.env.VITE_API_URL;
      const jsonData={
        userName:values.userName,
        password:values.password
      }
     const jsonDataString =JSON.stringify(jsonData);
      console.log("JSON DATA STRING:",jsonDataString);
      //API CALL
      /*  fetch(api_url,{
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body:jsonDataString
      })
      .then((response)=>response.json())
      .then((data)=>{
        console.log("Response from API:",data); 
        setOpen(true);
        setShowAlert(true);
        isLoggedInState(true);
        navigate("/dashboard/home"); //same as history.push api
            
      })
      .catch((error)=>{
        console.error("Error while calling API:",error);
      }) */
     dispatch(loginRequest(jsonData));
     console.log("Logging Success Value:",loggingSuccess);
     

      setOpen(true);
      setShowAlert(true);
      isLoggedInState(true);
      const token=localStorage.getItem("authToken");
      login(token);
      if(token){
      navigate("/dashboard/home");
      } //same as history.push api
     }
    
   
  })
   
   
    
  function handleNewUser(){
    newUserState(true);
  }

  return (
    <div>
      <div>
      <Box sx={{ width: '40%', height: '20vh', marginLeft: '65%', display: 'flex',fontSize:'28px', color:'red', alignItems: 'center' }}>
        <a href="#" onClick={handleNewUser} >New User? Register Here</a>
      </Box>
      </div>
      <div>
       {showAlert &&
    <Snackbar
        open={open}
        autoHideDuration={2000}   // 2 seconds
        onClose={() => setOpen(false)}
        anchorOrigin={{ vertical: "center", horizontal: "center" }}
      >
     <Alert icon={<CheckIcon fontSize="inherit" />} sx={{width: '100%',margin: '5px',padding: '5px'}} severity="success">
          "Login Successful!"
        </Alert>   
        </Snackbar>
 }
</div>
    <div>
    <Box sx={{ width: '30%', height: '30vh', marginLeft: '65%', display: 'flex',  alignItems: 'center' }}>
   
    <form onSubmit={formik.handleSubmit} style={{width:"100%"}}>
      <fieldset className='border-purple-700 border-2 rounded-md p-4'>
        <legend className='text-xl text-center   font-semibold text-purple-700'>Login</legend>
       <TextField fullWidth variant='outlined' label="UserName" 
       name="userName" sx={{padding:"10px"}} values={formik.values.userName}
        onChange={formik.handleChange} 
          error={formik.touched.userName && Boolean(formik.errors.userName)} 
         helperText={formik.touched.userName &&formik.errors.userName}
        
        slotProps={{
    input: {
      startAdornment: (
        <InputAdornment position="start">
         <AccountCircleIcon />
        </InputAdornment>
      )
    }
      }} />
        
       
       <TextField fullWidth variant='outlined' label="Password" name="password" type="password"
         sx={{padding:"10px"}} values={formik.values.password} onChange={formik.handleChange} 
          error={formik.touched.password && Boolean(formik.errors.password)} 
         helperText={formik.touched.password &&formik.errors.password}
         slotProps={{
    input: {
      startAdornment: (
        <InputAdornment position="start">
          <LockIcon />
        </InputAdornment>
      )
    }
  }} />
       
       <Button variant="contained" color="primary"  type="submit" sx={{margin:"10px"}}>
        Submit
        </Button>
        </fieldset>
    </form>

 
    </Box>
    </div>
    </div>
  )
}

export default Login;
