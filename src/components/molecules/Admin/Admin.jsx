import React, { use } from 'react';

import './Admin.css';

import {Box,TextField,Button,Stack, Typography, Alert, Divider,List,ListItem,ListItemText} from '@mui/material';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { addProductRequest } from '../../../redux/actions/productActions';
import { useDispatch } from 'react-redux';


function Admin() {
    const dispatch=useDispatch();
    
    const {loading,error,products}=useSelector((state)=>state.productState);
    const[form,setForm]=useState({
        name:"",
        category:"",
        price:0,
    })

    const handleChange=(e)=>{
       setForm((p=>{
        return{
            ...p,
            [e.target.name]:e.target.value
        }
        }))
    }
    const handleSubmit=(e)=>{
        e.preventDefault();
        // Dispatch action to add product
        const name=form.name;
        const category=form.category;
        const price=Number(form.price);
        console.log('Form submitted with:', form);
        if(!name||!category||!price){
            return;
        }
        dispatch(addProductRequest({name,category,price}));
        setForm({
            name:"",
            category:"",
            price:0,
        });
    }
    return(
        <Box sx={{p:3,maxWidth:600,margin:"auto"}}>
            <Typography variant="h4" gutterBottom sx={{mb:3,textAlign:"center"}}>
                Admin Panel - Add New Product
            </Typography>
            {error && <Alert sx={{mb:2}} severity="error">{error}</Alert>}
            <Box component="form" onSubmit={handleSubmit}  sx={{display:"flex",flexDirection:"column",gap:2}}>
            <Stack spacing={2}>
                
                <TextField label="Product Name" name="name" value={form.name} onChange={handleChange} variant="outlined">

                </TextField>
                <TextField label="Category" name="category" value={form.category} onChange={handleChange} variant="outlined">

                </TextField>
                <TextField label="Price" type="number" name="price" value={form.price} onChange={handleChange} variant="outlined">

                </TextField>
                <Button type="submit" variant="contained" color="primary" disabled={loading}>{loading?"Adding...":"Add Product"}</Button>
           
        
        </Stack>
        </Box>
        <Divider sx={{my:4}}/>
        <Typography variant="h5" gutterBottom>
            Products in Redux Store: {products.length}
        </Typography>
        {/* <List>
            {products.slice(0,5).map((product)=>(
                <ListItem key={product.id}>
                    <ListItemText primary={product.name} secondary={`Category: ${product.category} - Price: $${product.price}`}/>
                </ListItem>
            ))}
        </List>
        <Typography variant="body2" color="textSecondary">
            (Showing up to 5 products)
        </Typography> */}
        </Box>
    )
}



export default Admin;
