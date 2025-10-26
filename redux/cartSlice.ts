import {  ProductVariant } from '@/types/commerce';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';


interface CartItem {
  id: string; 
  product: ProductVariant;
  quantity: number;
}

export interface CartState {
  items: CartItem[];
}

const initialState: CartState = {
  items: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(
      state,
      action: PayloadAction<{ id: string; product: ProductVariant; quantity: number }>
    ) {
      const { id, product, quantity } = action.payload;
      const existing = state.items.find(item => item.id === id);

      if (existing) {
        existing.quantity += quantity; 
      } else {
        state.items.push({
          id,
          product,
          quantity,
        });
      }
    },

    removeFromCart(state, action: PayloadAction<string>) {
      state.items = state.items.filter(item => item.id !== action.payload);
    },

    updateQuantity(
      state,
      action: PayloadAction<{ id: string; quantity: number }>
    ) {
      const item = state.items.find(i => i.id === action.payload.id);
      if (item) item.quantity = action.payload.quantity;
    },

    clearCart(state) {
      state.items = [];
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } =
  cartSlice.actions;

export default cartSlice.reducer;