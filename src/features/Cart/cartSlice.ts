import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { BosaNogaAPI, ProductCart } from "../../entities/Service";

export interface CartState {
  products: ProductCart[],
}

const initialState: CartState = {
  products: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addProduct(state, action) {
      const idx = state.products.findIndex(product => product.id === action.payload.id && product.size === action.payload.size);
      if (idx != -1) {
        state.products[idx].count += action.payload.count;
      } else {
        state.products.push(action.payload);
      }
      BosaNogaAPI.saveLocalStorage(state.products);
    },
    removeProduct(state, action) {
      state.products = state.products.filter(product => !(product.id === action.payload.id && product.size === action.payload.size));
      BosaNogaAPI.saveLocalStorage(state.products);
    },
    setCart(state, action) {
      state.products = action.payload;
    },
    clearCart(state) {
      state.products = [];
      BosaNogaAPI.saveLocalStorage(state.products);
    }
  },
});

export const selectCart = (state: RootState) => state.cart;

export const {
  addProduct,
  removeProduct,
  setCart,
} = cartSlice.actions;

export default cartSlice.reducer;