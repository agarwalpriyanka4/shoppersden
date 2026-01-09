import React, { use } from 'react';

import './BookDetails.css';
import { Typography } from '@mui/material';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Box } from '@mui/material';
function BookDetails() {
  //route param to get bookId
  //const {bookId, name} = useParams();
  const {bookId} = useParams();
  const [bookDetails, setBookDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(()=>{
    if (!bookId) return;          // ✅ IMPORTANT: stop here if no id

    setBookDetails(null);    
    //fetch book details using bookId
    fetch(import.meta.env.VITE_BOOKS_BaseURL+`/${bookId}`)
    .then((res)=>res.json())
    .then((data)=>{
      console.log(data);
      setBookDetails(data);
      setLoading(false);
    }).catch((err)=>{
      console.log(err);
      setError(err);
      setLoading(false);
    });
  },[bookId]);

  if(loading){
    return <p>Loading...</p>;
  }
  if(error){
    return <p>Error loading book details: {error.message}</p>;
  }
  return(
    <Box>
      {Object.entries(bookDetails).map(([key, value]) => (
    <Typography key={key} sx={{ mb: 1 }}>
      <strong>{key}:</strong> {value}
    </Typography>
  ))}
    </Box>
  )
 
}
export default BookDetails;
