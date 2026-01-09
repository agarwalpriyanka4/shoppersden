import { REGISTER_USER_REQUEST,REGISTER_USER_SUCCESS,REGISTER_USER_FAILURE } from "./registrationTypes";

export const registerUserRequest = (newUser) => async (dispatch) => {
    dispatch({ type: REGISTER_USER_REQUEST });
    try {
        const response = await fetch(import.meta.env.VITE_USER_REGISTER_API, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newUser),
        }); 
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }   
        const data = await response.json();
        console.log('User registered successfully:', data);
        dispatch({ type: REGISTER_USER_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: REGISTER_USER_FAILURE, payload: error.message });
    }

}