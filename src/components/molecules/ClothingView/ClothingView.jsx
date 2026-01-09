import React from 'react';

import './ClothingView.css';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Box from '@mui/material/Box';

function ClothingView({title,items,search,setSearch}) {
  return (
    <Box sx={{}}>
      <Typography variant="h4" gutterBottom>
        {title}
      </Typography>
      <TextField
        label="Search Clothing"
        variant="outlined"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        fullWidth
        margin="normal"
      />
      <List>
        {items.map((item) => (
          <ListItem key={item.id}>
            <ListItemText
              primary={item.name}
              secondary={`Price: $${item.price}`}
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
}



export default ClothingView;
