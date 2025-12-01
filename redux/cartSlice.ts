/* eslint-disable  @typescript-eslint/no-explicit-any */

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { GetCurrentProductType } from "@/types/commerce";

export interface CartState {
  deviceId?: string;
  quantity: number;
  cartGeneralInfo?: GetCurrentProductType;
  loading: boolean;
  error?: string;
  lastItemIsChangedId: number | null;
  currency?: string;
}

const initialState: CartState = {
  deviceId: undefined,
  quantity: 1,
  cartGeneralInfo: undefined,
  loading: true,
  error: undefined,
  lastItemIsChangedId: null,
  currency: "IRR",
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addDeviceId(state, action: PayloadAction<string>) {
      state.deviceId = action.payload;
    },
    setLastItemChangedId(state, action: PayloadAction<number | null>) {
      state.lastItemIsChangedId = action.payload;
    },
    setCurrency(state, action: PayloadAction<string>) {
      state.currency = action.payload;
    },
    setGeneralCartInfo(state, action: PayloadAction<GetCurrentProductType>) {
      state.cartGeneralInfo = action.payload;
    },
    setGeneralCartLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    }
  }
});

export const {
  addDeviceId,
  setLastItemChangedId,
  setCurrency,
  setGeneralCartInfo,
  setGeneralCartLoading
} = cartSlice.actions;

export default cartSlice.reducer;