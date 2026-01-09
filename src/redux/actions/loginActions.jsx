import {LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE} from './loginTypes';

export const loginRequest = (loggedInUser) => async (dispatch) => {
    dispatch({ type: LOGIN_REQUEST });
    console.log('Logging in user:', loggedInUser);
    try {
        const response = await fetch(import.meta.env.VITE_LOGIN_API, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(loggedInUser),
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log('User logged in successfully:', data);
        localStorage.setItem('authToken', data.token);
        dispatch({ type: LOGIN_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: LOGIN_FAILURE, payload: error.message });
    }
}