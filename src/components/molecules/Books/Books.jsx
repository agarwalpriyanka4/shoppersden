import React from 'react';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import './Books.css';
import { Box,Button,Chip, List, ListItem, ListItemAvatar, ListItemText, Paper,Pagination,Stack,Typography, Avatar, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import BookDetails from '../BookDetails/BookDetails';
function Books() {
  const [items, setItems] = React.useState([]);
  const [page, setPage] = React.useState(1);
  const [limit, setLimit] = React.useState(4);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);
   const [totalPages, setTotalPages] = React.useState(1);
  const [totalItems, setTotalItems] = React.useState(0);
  const [open, setOpen] = React.useState(false);
  const[close, setClose]=React.useState(false);

  const navigate = useNavigate();
  
  React.useEffect(() => {
    fetch(`${import.meta.env.VITE_BOOKS_BaseURL}?page=${page}&limit=${limit}`)
      .then((res) => res.json())
      .then((data) => {
        setItems(Array.isArray(data.items) ? data.items : [])
        setTotalItems(data.totalItems || 0);
        setTotalPages(data.totalPages || 1);
        console.log(data.items);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching books:', err);
        setError(err);
      })
      .finally(() => setLoading(false));
  }, [page, limit]);
  
  if (loading) {
    return <div>Loading books...</div>;
  }

  if (error) {
    return <div>Error loading books: {error.message}</div>;
  }

  function handleOpenDetails(book){
    console.log("Book clicked:", book);
  setOpen(true);
  navigate(`/dashboard/books/${book.id}`);
  }
  function handleClose() {
    setOpen(false); 
    // Close book details popup + reset route param
    navigate(`/dashboard/books/`, { replace: true });
  }


  return(
    <div className="books-container">
      {
        items.length === 0 ? (
          <div>No books available.</div>
        ) : (
          <Box sx={{ p: 1 }}>
  <Paper elevation={2} sx={{ p: 1.5, borderRadius: 2 }}>
           <Box sx={{ display: "flex", justifyContent: "space-between", gap: 2, flexWrap: "wrap" }}>
          <Typography variant="h5" fontWeight={700}>
            Books
          </Typography>
          <Typography variant="body2" sx={{ opacity: 0.8 }}>
            Total: <b>{totalItems}</b> • Page <b>{page}</b> / <b>{totalPages}</b> • Limit <b>{limit}</b>
          </Typography>
        </Box>
          <List sx={{ width: '100%', maxWidth: 600, bgcolor: 'background.paper' }}>
          {
            items.map((book) => (
              <ListItem key={book.id}>
               <ListItemAvatar>
                <Avatar sx={{ cursor: "pointer", bgcolor: "primary.main" }} onClick={(e) => {
        handleOpenDetails(book);  // opens popup + route param
      }}>
                 <MenuBookIcon/>
                 </Avatar>
                </ListItemAvatar> 
               <ListItemText disableTypography primary={
            
                  <Box>
                    <Typography variant="h6">
                      {book.title}
                    </Typography>
                    <Chip label={book.category} />
                    <Chip label={book.publishedYear} />
                  </Box>

               } secondary={
                <Box>
                     <Typography variant="body2" color="textSecondary">
                  {book.isbn}
                </Typography>
                    <Typography variant="body2" color="textSecondary">
                  {book.author}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Price: <CurrencyRupeeIcon/>{book.price}
                </Typography>
                
               
                </Box>
               }>
              
               </ListItemText>
              </ListItem>
            ))
          }
          </List>
      </Paper>
          </Box>
          
          )
        
      }
       <Stack spacing={2} sx={{ marginTop: '10px', marginBottom: '10px', alignItems: 'center' }}>
        <Pagination 
          count={totalPages}
          page={page} 
          onChange={(event, value) => setPage(value)} 
          color="primary" 
           disabled={loading || totalPages <= 1}
        />
      </Stack>
      <Dialog open={open} onClose={handleClose} >
        <DialogTitle>Book Details</DialogTitle>
        <DialogContent> 
          {open&&<BookDetails />}
        </DialogContent>
        <DialogActions>
          <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
        </DialogActions>
      </Dialog>
    </div>
  );
}




export default Books;
