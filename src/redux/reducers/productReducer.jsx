import { ADD_PRODUCT_REQUEST,ADD_PRODUCT_SUCCESS,ADD_PRODUCT_FAILURE } from "../actions/productTypes.jsx";

const initialState = {
    products: [],
    loading: false,
    error: null 
};
const productReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_PRODUCT_REQUEST:   
            return {
                ...state,
                loading: true,  
                error: null  
            };
        case ADD_PRODUCT_SUCCESS:   
            return {
                ...state,
                loading: false, 
                products: [action.payload,...state.products] 
            };
        case ADD_PRODUCT_FAILURE:
            return {
                ...state,
                loading: false, 
                error: action.payload
            };
        default:
            return state;
    }
}
export default productReducer;