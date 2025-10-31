import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CartState {
  deviceId?: string;
  quantity: number;
}

const initialState: CartState = {
  deviceId: undefined,
  quantity: 1,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addDeviceId(state, action: PayloadAction<string>) {
      state.deviceId = action.payload;
    },
    removeDeviceId(state) {
      state.deviceId = undefined;
    },
    addQuantity: {
      reducer(state, action: PayloadAction<number>) {
        state.quantity = (state.quantity || 0) + action.payload;
      },
      prepare(amount?: number) {
        return { payload: amount ?? 1 }; 
      },
    },
    removeQuantity(state, action: PayloadAction<number>) {
      state.quantity = (state.quantity || 0) - action.payload;
      if (state.quantity < 1) state.quantity = 1;
    },
  },
});

export const { removeDeviceId, addDeviceId, addQuantity, removeQuantity } =
  cartSlice.actions;

export default cartSlice.reducer;