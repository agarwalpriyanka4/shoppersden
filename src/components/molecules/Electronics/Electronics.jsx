import React from 'react';
import { Card, CardContent, CardMedia, Typography, Grid, CardActions, Box,Button,TextField,Pagination,Stack, FormControl, Select, MenuItem } from '@mui/material';
import './Electronics.css';
import axios from 'axios';


function Electronics(){

  const[electronics, setElectronics] = React.useState([]);
  const[loading, setLoading] = React.useState(true);
  const[error, setError] = React.useState(null);
  const api_url=import.meta.env.VITE_ELECTRONICS_ENDPOINT;
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
      setElectronics(Array.isArray(response.data.data) ? response.data.data : []);
        console.log("Electronics data fetched:", response.data);
        setLoading(false);
    }).catch(error => {
      console.error('Error fetching electronics with axios:', error);
      setError(error);
      setLoading(false);
    });

    /* fetch(api_url)
      .then(response => response.json())
      .then(data => {
        setElectronics(Array.isArray(data.data) ? data.data : []);
        console.log("Electronics data fetched:", data);
        setLoading(false);

      })
      .catch(error => {
        console.error('Error fetching electronics:', error)
        setError(error);
        setLoading(false); 
  });
  */
  }, []);
  if (loading) {
    return <div>Loading electronics...</div>;
  }

  if (error) {
    return <div>Error loading electronics: {error.message}</div>;
  }

  function handleSearch(event) {
    setSearchTerm(event.target.value);
    setPage(1); // Reset to first page on new search
  }
  function handleSortChange(event) {
    setSortBy(event.target.value);
    setPage(1); // Reset to first page on new sort
  }
  const filteredElectronics = electronics.filter(electronics => {
    const name = (electronics.name ?? '').toString().toLowerCase();
    const desc = (electronics.description ?? '').toString().toLowerCase();
    return name.includes(searchTerm.toLowerCase()) || desc.includes(searchTerm.toLowerCase());
  });
console.log("Filtered Electronics data fetched:", filteredElectronics);
  // Sorting
  const sortedElectronics = filteredElectronics.sort((a, b) => {
    if (sortBy === 'nameAsc') {
      return a.name.localeCompare(b.name);
    } else if (sortBy === 'nameDesc') {
      return b.name.localeCompare(a.name);
    } 
    return 0;
  });
  console.log("Sorted Electronics data fetched:", sortedElectronics);

  if (electronics.length > 0) {
    pageCount = Math.ceil(sortedElectronics.length / itemsPerPage);
    startIndex = (page - 1) * itemsPerPage;
    console.log("Start Index:", startIndex);
     endIndex = startIndex + itemsPerPage;
      console.log("End Index:", endIndex);
    slicedItems = sortedElectronics.slice(startIndex, endIndex);
  }
  return(
    <div className="electronics-container">
     <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '20px',padding: "10px" }}>
        <TextField
          label="Search Electronics"
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
        {filteredElectronics.length === 0 ? (
          <Grid item xs={12}>
            <Typography variant="h6">No electronics available.</Typography>
          </Grid>
        ) : (
          slicedItems.map((electronics) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={electronics.id}>
              <Card className="electronics-card">
                <CardMedia
                  component="img"
                  height="200"
                  image={electronics.image} sx={{height: 200,width: "100%",objectFit: "cover"}}
                  alt={electronics.name} 
                />
                <CardContent>
                  <Typography variant="h6" component="div">
                    {electronics.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {electronics.description}
                  </Typography>
                  <Typography variant="subtitle1" color="text.primary">
                    Price: ${electronics.price}
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
          count={Math.ceil(filteredElectronics.length / itemsPerPage)} 
          page={page} 
          onChange={(event, value) => setPage(value)} 
          color="primary" 
        />
      </Stack>
    </div>
  );
}


export default Electronics;
