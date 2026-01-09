import { configureStore } from "@reduxjs/toolkit";  
import rootReducer from "../reducers/rootReducer.jsx";

const store = configureStore({
    reducer: rootReducer
});
export default store;