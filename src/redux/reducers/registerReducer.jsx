import {REGISTER_USER_REQUEST, REGISTER_USER_SUCCESS, REGISTER_USER_FAILURE} from '../actions/registrationTypes.jsx';
const initialState = {
    registering: false,
    registerSuccess: false,
    registerError: null,
    registerData: null
};

const registerReducer = (state = initialState, action) => {
    switch (action.type) {
        case REGISTER_USER_REQUEST:
            return {
                ...state,
                registering: true,
                registerSuccess: false,
                registerError: null,
                registerData: null
            };
        case REGISTER_USER_SUCCESS:
            return {
                ...state,
                registering: false,
                registerSuccess: true,
                registerError: null,
                registerData: action.payload
            };
        case REGISTER_USER_FAILURE:
            return {
                ...state,
                registering: false,
                registerSuccess: false,
                registerError: action.payload,
                registerData: null
            };
        default:
            return state;
    }
};

export default registerReducer;