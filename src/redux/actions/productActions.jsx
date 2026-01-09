import { ADD_PRODUCT_REQUEST,ADD_PRODUCT_SUCCESS,ADD_PRODUCT_FAILURE } from "./productTypes.jsx";

export const addProductRequest = (newProduct)=>async(dispatch)=>{
    try{
        dispatch({type:ADD_PRODUCT_REQUEST});
        console.log('Adding product:', newProduct);
        const res= await fetch(`${import.meta.env.VITE_PRODUCTS_API}`,{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(newProduct)
            });
        if(!res.ok){
            throw new Error('Failed to add product');
        }
        const data = await res.json();
        console.log('Product added successfully:', data);
        dispatch({type: ADD_PRODUCT_SUCCESS, payload: data});

    }catch(error){
        dispatch({type: ADD_PRODUCT_FAILURE, payload: error.message});
    }
}
