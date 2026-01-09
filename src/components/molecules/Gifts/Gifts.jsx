import React from 'react';
import { Card, CardContent, CardMedia, Typography, Grid, CardActions, Box,Button,TextField,Pagination,Stack, FormControl, Select, MenuItem } from '@mui/material';
import './Gifts.css';
import axios from 'axios';


function Gifts(){

  const[gifts, setGifts] = React.useState([]);
  const[loading, setLoading] = React.useState(true);
  const[error, setError] = React.useState(null);
  const api_url=import.meta.env.VITE_GIFT_ENDPOINT;
  const [page, setPage] = React.useState(1);
  const [searchTerm, setSearchTerm] = React.useState('');
  const [sortBy, setSortBy] = React.useState('nameAsc'); // 'price-asc' or 'price-desc'
  let slicedItems=0;
  let pageCount=0;
  let startIndex=0;
  let endIndex=0;

  const itemsPerPage = 5;

  React.useEffect(() => {
    axios.get(api_url).then(response => { 
      setGifts(Array.isArray(response.data.data) ? response.data.data : []);
        console.log("Gifts data fetched:", response.data);
        setLoading(false);
    }).catch(error => {
      console.error('Error fetching gifts with axios:', error);
      setError(error);
      setLoading(false);
    });

    /* fetch(api_url)
      .then(response => response.json())
      .then(data => {
        setGifts(Array.isArray(data.data) ? data.data : []);
        console.log("Gifts data fetched:", data);
        setLoading(false);

      })
      .catch(error => {
        console.error('Error fetching gifts:', error)
        setError(error);
        setLoading(false); 
  });
  */
  }, []);
  if (loading) {
    return <div>Loading gifts...</div>;
  }

  if (error) {
    return <div>Error loading gifts: {error.message}</div>;
  }

  function handleSearch(event) {
    setSearchTerm(event.target.value);
    setPage(1); // Reset to first page on new search
  }
  function handleSortChange(event) {
    setSortBy(event.target.value);
    setPage(1); // Reset to first page on new sort
  }
  const filteredGifts = gifts.filter(gift => {
    const name = (gift.name ?? '').toString().toLowerCase();
    const desc = (gift.description ?? '').toString().toLowerCase();
    return name.includes(searchTerm.toLowerCase()) || desc.includes(searchTerm.toLowerCase());
  });

  // Sorting
  const sortedGifts = filteredGifts.sort((a, b) => {
    if (sortBy === 'nameAsc') {
      return a.name.localeCompare(b.name);
    } else if (sortBy === 'nameDesc') {
      return b.name.localeCompare(a.name);
    } 
    return 0;
  });
  if (gifts.length > 0) {
    pageCount = Math.ceil(sortedGifts.length / itemsPerPage);
    startIndex = (page - 1) * itemsPerPage;
    console.log("Start Index:", startIndex);
     endIndex = startIndex + itemsPerPage;
      console.log("End Index:", endIndex);
    slicedItems = sortedGifts.slice(startIndex, endIndex);
  }
  return(
    <div className="gifts-container">
     <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '20px',padding: "10px" }}>
        <TextField
          label="Search Gifts"
          variant="outlined"
          
          margin="normal"
         
          value={searchTerm}
          onChange={handleSearch}
        />
        <FormControl sx={{ marginLeft: '20px', minWidth: 200,padding:"10px" }} >
          <Select value={sortBy} displayEmpty onChange={handleSortChange}>
            <MenuItem value="nameAsc">Name: A to Z</MenuItem>
            <MenuItem value="nameDesc">Name: Z to A</MenuItem>
            
          </Select>
        </FormControl>
     </Box>

      <Grid container spacing={3}>
        {filteredGifts.length === 0 ? (
          <Grid item xs={12}>
            <Typography variant="h6">No gifts available.</Typography>
          </Grid>
        ) : (
          slicedItems.map((gift) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={gift.id}>
              <Card className="gift-card">
                <CardMedia
                  component="img"
                  height="200"
                  image={gift.image}
                  alt={gift.name}
                />
                <CardContent>
                  <Typography variant="h6" component="div">
                    {gift.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {gift.description}
                  </Typography>
                  <Typography variant="subtitle1" color="text.primary">
                    Price: ${gift.price}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small" color="primary">
                    Buy Now
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))
        )}
      </Grid>
      <Stack spacing={2} sx={{ marginTop: '10px', marginBottom: '10px', alignItems: 'center' }}>
        <Pagination 
          count={Math.ceil(filteredGifts.length / itemsPerPage)} 
          page={page} 
          onChange={(event, value) => setPage(value)} 
          color="primary" 
        />
      </Stack>
    </div>
  );
}


export default Gifts;
