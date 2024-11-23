import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './slices/add-cart/addCartSlice'; 

const Store = configureStore({
  reducer: {
    cart: cartReducer, 
  },
});

export default Store;
