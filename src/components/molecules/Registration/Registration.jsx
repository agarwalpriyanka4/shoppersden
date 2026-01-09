import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Alert, Box, Button, TextField } from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LockIcon from '@mui/icons-material/Lock';  
import EmailIcon from '@mui/icons-material/Email';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import PhoneInTalkIcon from '@mui/icons-material/PhoneInTalk';
import './Registration.css';
import { useDispatch,useSelector } from 'react-redux';
import { registerUserRequest } from '../../../redux/actions/registrationActions.jsx';


function Registration({newUserState}) {
  const dispatch=useDispatch();
  const{registering,registerError,registerSuccess,registerData}=useSelector((state)=>state.registerState);
  const validationSchema = Yup.object({
    firstName: Yup.string()
      .min(3, 'Must be at least 3 characters' )
      .max(25, 'Must be 25 characters or less')
      .matches(/^[A-Za-z]+$/, 'Only alphabetic characters are allowed')
      .required('Required'),
    lastName: Yup.string()
      .min(3, 'Must be at least 3 characters' )
      .max(20, 'Must be 20 characters or less')
      .matches(/^[A-Za-z]+$/, 'Only alphabetic characters are allowed')
      .required('Required'),
    userName: Yup.string()
      .min(5, 'Must be at least 5 characters')
      .max(10, 'Must be 10 characters or less')
      .matches(/^[A-Za-z0-9_]+$/, 'Only alphanumeric characters and underscores are allowed')
      .required('Required'),
    email: Yup.string()
      .email('Invalid email address')
      .matches(/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/, 'Invalid email format')
      .required('Required'),
    password: Yup.string()
      .min(8, 'Must be at least 8 characters')
      .matches(/[A-Z]/, 'Must contain at least one uppercase letter')
      .matches(/[a-z]/, 'Must contain at least one lowercase letter')
      .matches(/[0-9]/, 'Must contain at least one number')
      .matches(/[@$!%*?&]/, 'Must contain at least one special character')
      .required('Required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Required'),
    dob: Yup.date()      
      //.max(new Date(), 'Date of Birth cannot be in the future')
      //.matches(/^\d{4}-\d{2}-\d{2}$/, 'Date of Birth must be in the format YYYY-MM-DD')
      .required('Required'),
    mobileNo: Yup.number()
      .typeError('Must be a number')
      .min(1000000000, 'Must be at least 10 digits')
      .max(9999999999, 'Must be at most 10 digits')
      .required('Required'),
  });

  const formik=useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      userName: '',
      email: '',
      password: '',
      confirmPassword: '',
      dob: '',
      mobileNo: 0,

    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log('Form data', values);      
      
      const jsonData = {
        firstName: values.firstName,
        lastName: values.lastName,
        userName: values.userName,
        email: values.email,
        password: values.password,
        dob: values.dob,
        mobileNo: values.mobileNo,
      };
      const jsonDataString = JSON.stringify(jsonData);
      console.log('JSON DATA STRING:', jsonDataString);
      dispatch(registerUserRequest(jsonData));
      console.log('Registration dispatched');
      console.log('Register Success:', registerSuccess);
      
      newUserState(false);
    }
  });
  
  return (
    <Box sx={{ width: '40%', height: '90vh', marginRight: '3%', display: 'flex', float: 'right', alignItems: 'center' }}>
     {registerSuccess && (<Alert severity="success" sx={{mb:2}}>Registration Successful!</Alert>)}
      {registerError && (<Alert severity="error" sx={{mb:2}}>Registration Failed: {registerError}</Alert>)}
    <form onSubmit={formik.handleSubmit} style={{width:"100%"}}>
      <fieldset className='border-purple-700 border-2 rounded-md p-4'>
        <legend className='text-xl text-center   font-semibold text-purple-700'>Registration</legend>
       <TextField fullWidth variant='outlined' label="FirstName" 
       name="firstName" sx={{padding:"10px"}} values={formik.values.firstName}
        onChange={formik.handleChange} 
          error={formik.touched.firstName && Boolean(formik.errors.firstName)} 
         helperText={formik.touched.firstName &&formik.errors.firstName}
        
        slotProps={{
    input: {
      startAdornment: (
        <InputAdornment position="start">
         <AccountCircleIcon />
        </InputAdornment>
      )
    }
      }} />
        
       
       <TextField fullWidth variant='outlined' label="lastName" name="lastName" 
         sx={{padding:"10px"}} values={formik.values.lastName} onChange={formik.handleChange} 
          error={formik.touched.lastName && Boolean(formik.errors.lastName)} 
         helperText={formik.touched.lastName &&formik.errors.lastName}
         slotProps={{
    input: {
      startAdornment: (
        <InputAdornment position="start">
          <AccountCircleIcon />
        </InputAdornment>
      )
    }
  }} />

  
       <TextField fullWidth variant='outlined' label="userName" name="userName" 
         sx={{padding:"10px"}} values={formik.values.userName} onChange={formik.handleChange} 
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
  
       <TextField fullWidth variant='outlined' label="password" name="password" type="password"
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
<TextField fullWidth variant='outlined' label="confirmPassword" name="confirmPassword" type="password"
         sx={{padding:"10px"}} values={formik.values.confirmPassword} onChange={formik.handleChange} 
          error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)} 
         helperText={formik.touched.confirmPassword &&formik.errors.confirmPassword}
         slotProps={{
    input: {
      startAdornment: (
        <InputAdornment position="start">
          <LockIcon />
        </InputAdornment>
      )
    }
  }} />


  <TextField fullWidth variant='outlined' label="email" name="email" 
         sx={{padding:"10px"}} values={formik.values.email} onChange={formik.handleChange} 
          error={formik.touched.email && Boolean(formik.errors.email)} 
         helperText={formik.touched.email &&formik.errors.email}
         slotProps={{
    input: {
      startAdornment: (
        <InputAdornment position="start">
          <EmailIcon />
        </InputAdornment>
      )
    }
  }} />
       
  
       <TextField fullWidth variant='outlined' label="dob" name="dob" type="date"
         sx={{padding:"10px"}} values={formik.values.dob} onChange={formik.handleChange} 
          error={formik.touched.dob && Boolean(formik.errors.dob)} 
         helperText={formik.touched.dob &&formik.errors.dob}
         slotProps={{
    input: {
      startAdornment: (
        <InputAdornment position="start">
          <CalendarMonthIcon />
        </InputAdornment>
      )
    }
  }} />
  
       <TextField fullWidth variant='outlined' label="mobileNo" name="mobileNo" 
         sx={{padding:"10px"}} values={formik.values.mobileNo} onChange={formik.handleChange} 
          error={formik.touched.mobileNo && Boolean(formik.errors.mobileNo)} 
         helperText={formik.touched.mobileNo &&formik.errors.mobileNo}
         slotProps={{
    input: {
      startAdornment: (
        <InputAdornment position="start">
          <PhoneInTalkIcon />
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
  )

  

}

export default Registration;
