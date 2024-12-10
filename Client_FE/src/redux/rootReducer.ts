import { combineReducers } from "redux";
import appReducer from "./slices/appSlice"; // Import appSlice.reducer
import userReducer from "./slices/userSlice";
import productReducer from "./slices/ProductSlice";
import cartReducer from "./slices/cartSlice";

const rootReducer = combineReducers({
    app: appReducer,
    user: userReducer,
    product: productReducer,
    cart: cartReducer,
});

export default rootReducer;
