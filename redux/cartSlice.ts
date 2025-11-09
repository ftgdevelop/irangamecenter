import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { GetCurrentProductResponseType, GetCurrentProductType } from "@/types/commerce";
import { RootState } from ".";
import axios from "axios";
import { Cart, ServerAddress } from "@/enum/url";

export const fetchCart = createAsyncThunk(
  "cart/fetchCart",
  async (_, { getState, rejectWithValue }) => {
    const state = getState() as RootState;
    const deviceId = state.cart.deviceId;
    const currency = state.cart.currency;

    if (!deviceId) {
      return rejectWithValue("Device ID missing");
    }

    try {
      const res = await axios.get<GetCurrentProductResponseType>(
        `${ServerAddress.Type}${ServerAddress.Commerce}${Cart.GetCurrentCart}`,
        {
          headers: {
            "X-Device-Id": deviceId,
            ...(currency && { Currency: currency }),
          },
        }
      );

      return res.data.result;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

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
  loading: false,
  error: undefined,
  lastItemIsChangedId: null,
  currency: "IRR"
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
    setLastItemChangedId(state, action: PayloadAction<number | null>) {
      state.lastItemIsChangedId = action.payload;
    },
    setCurrency(state, action: PayloadAction<string>) {
      state.currency = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.pending, (state) => {
        state.loading = true;
        state.error = undefined;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cartGeneralInfo = action.payload;
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const {
  addDeviceId,
  removeDeviceId,
  addQuantity,
  removeQuantity,
  setLastItemChangedId,
  setCurrency
} = cartSlice.actions;

export default cartSlice.reducer;