import { combineReducers } from "redux";
import productReducer   from "./productReducer.jsx";
import registerReducer from "./registerReducer.jsx";
import loginReducer from "./loginReducer.jsx";
const rootReducer = combineReducers({
    productState: productReducer,
    registerState: registerReducer,
    loginState: loginReducer
});
export default rootReducer;