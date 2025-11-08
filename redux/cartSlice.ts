import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { getCart } from "@/actions/cart";
import { GetCurrentProductType } from "@/types/commerce";

export const fetchCart = createAsyncThunk(
  "cart/fetchCart",
  async (deviceId: string | undefined, { rejectWithValue }) => {
    if (!deviceId) return undefined;
    try {
      const data = await getCart(deviceId)
        .then(res => res?.result as GetCurrentProductType)
        .catch(err => {
          throw new Error(err?.message || "Failed to fetch cart");
        });
      return data;
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
  lastItemIsChangedId: number | null
}

const initialState: CartState = {
  deviceId: undefined,
  quantity: 1,
  cartGeneralInfo: undefined,
  loading: false,
  error: undefined,
  lastItemIsChangedId: null
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
  setLastItemChangedId
} = cartSlice.actions;

export default cartSlice.reducer;