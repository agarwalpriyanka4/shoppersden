import React from 'react';

import './Page404.css';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/material';
const Page404 = () => (
  <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '70vh' }}>
    <Paper elevation={3} className="Page404-Paper">
      <Typography variant="h3" component="h1" className="Page 404 Not Exist"></Typography>
      <Typography variant="body1" className="Page404-Message">
        Oops! The page you are looking for does not exist.
      </Typography>
      
    </Paper>
  </Box>
);



export default Page404;
