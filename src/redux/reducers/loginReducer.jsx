import { LOGIN_SUCCESS,LOGIN_REQUEST,LOGIN_FAILURE } from "../actions/loginTypes";
const initialState = {
    logging: false,
    loggingSuccess: false,
    loggingError: null,
    loggingData: null
};
const loginReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_REQUEST:
            return {
                ...state,
                logging: true,  
                loggingSuccess: false,
                loggingError: null,
                loggingData: null
            };  
        case LOGIN_SUCCESS:
            return {
                ...state,
                logging: false, 
                loggingSuccess: true,
                loggingError: null,
                loggingData: action.payload
            };  

        case LOGIN_FAILURE:
            return {
                ...state,
                logging: false, 
                loggingSuccess: false,
                loggingError: action.payload,
                loggingData: null
            };  
        default:
            return state;
    }
};
export default loginReducer;