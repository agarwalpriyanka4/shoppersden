import React from 'react';
import { useState,useEffect } from 'react';
import './Sports.css';
import { Typography } from '@mui/material';
import { Box, TextField, List, ListItem, ListItemText } from '@mui/material';
import useFilter from '../useFilter/useFilter.jsx';


function Sports() {
 const[sports,setSports]=useState([]);
 const[loading,setLoading]=useState(false);
 const[error,setError]=useState(null);
 const{title,search,setSearch,items}=useFilter("Sports",sports);
  useEffect(()=>{ 
    fetch(`${import.meta.env.VITE_SPORTS_API}`)
    .then((res)=>res.json())
    .then((data)=>{
      setSports(Array.isArray(data.data) ? data.data : []);
      setLoading(false);
    })
    .catch((err) => {
      setError(err);
      setLoading(false);
    });
  },[]);
  if (loading) {
    return <div>Loading sports...</div>;
  }

  if (error) {
    return <div>Error loading sports: {error.message}</div>;
  }
  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h4" sx={{ mb: 2 }}>
        {title} Component
      </Typography>    
      <TextField fullWidth label="Search Sports" value={search} 
      onChange={(e) => setSearch(e.target.value)} sx={{ mb: 2 }} />
      <List>
        {items.map((sport) => (
          <ListItem key={sport.id} divider>
            <ListItemText
              primary={sport.name}
              secondary={`Category: ${sport.category} | Price: $${sport.price}`}
            />
          </ListItem>
        ))}
      </List>  


      
    </Box>
  );
  

}



export default Sports;
