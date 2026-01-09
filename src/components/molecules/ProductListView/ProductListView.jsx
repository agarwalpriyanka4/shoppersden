import React from 'react';
import { Box, Typography, List, ListItem, ListItemText } from '@mui/material';
import { useSelector } from 'react-redux';

import './ProductListView.css';

function ProductListView() {
   const {loading,error,products}=useSelector((state)=>state.productState);
   if(loading){
    return <div>Loading products...</div>;
   }
   if(error){
    return <div>Error loading products: {error}</div>;
   }
   return(
    <Box>
    <Typography variant="h4" gutterBottom sx={{textAlign:"center",mb:3}}>
        Product List View
    </Typography>
    <List>
        {products.slice(0, 5).map((product)=>(
            <ListItem key={product.id}>
                <ListItemText primary={product.name} secondary={`Category: ${product.category} - Price: $${product.price}`}/>
            </ListItem>
        ))}
    </List>
    </Box>
   )
}


export default ProductListView;
