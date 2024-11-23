import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  products: [], 
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addProduct: (state, action) => {
      const product = action.payload;
      const existingProduct = state.products.find((p) => p.id === product.id);

      if (existingProduct) {
        existingProduct.quantity += 1;
      } else {
        state.products.push({ ...product, quantity: 1 });
      }
    },
    increaseQuantity: (state, action) => {
      const productId = action.payload;
      const product = state.products.find((p) => p.id === productId);

      if (product) {
        product.quantity += 1;
      }
    },
    decreaseQuantity: (state, action) => {
      const productId = action.payload;
      const product = state.products.find((p) => p.id === productId);

      if (product && product.quantity > 1) {
        product.quantity -= 1;
      }
    },
  },
});

export const { addProduct, increaseQuantity, decreaseQuantity, } = cartSlice.actions;
export default cartSlice.reducer;
