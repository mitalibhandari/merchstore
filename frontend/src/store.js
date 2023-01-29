import { configureStore, combineReducers } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import {
  productListReducer,
  productDetailsReducer,
} from "./reducers/productReducers";
import { cartReducer } from "./reducers/cartReducers";
import { userLoginReducer, userRegisterReducer, userDetailsReducer, userUpdateProfileReducer } from './reducers/userReducers'
import { orderCreateReducer } from './reducers/orderReducers'

const reducer = combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer,
  cart: cartReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer,
  orderCreate: orderCreateReducer,
});

const cartItemsFromStorage = localStorage.getItem("cartItem")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : [];

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const shippingAddressFromStorage = localStorage.getItem("shippingAddress")
  ? JSON.parse(localStorage.getItem("shippingAddress"))
  : {};

export const initialState = {
  cart: { 
    cartItems: cartItemsFromStorage,
    shippingAddress: shippingAddressFromStorage
   },
  userLogin: {userInfo: userInfoFromStorage}
};

const middleware = [thunk];
const store = configureStore({ reducer, initialState, middleware });

export default store;
