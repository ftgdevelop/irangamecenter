import { ProductDetailData } from "@/types/commerce";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CartItem {
  productId: string;
  product: ProductDetailData;
  variants?: ProductDetailData["variants"];
  variantIDs?: string[];
  quantity: number;
}

export interface CartState {
  items: CartItem[];
  totalQuantity: number;
}

const initialState: CartState = {
  items: [],
  totalQuantity: 0,
};

export const areVariantIDsEqual = (a?: string[], b?: string[]): boolean => {
  if (!a && !b) return true;
  if (!a || !b) return false;
  if (a.length !== b.length) return false;
  return [...a].sort().every((id, i) => id === [...b].sort()[i]);
};

const generateCartId = (baseId: string, variantIDs?: string[]) => {
  if (!variantIDs || variantIDs.length === 0) return baseId;
  return `${baseId}_${variantIDs.sort().join("-")}`;
};

const recalcTotalQuantity = (state: CartState) => {
  state.totalQuantity = state.items.reduce(
    (total, item) => total + item.quantity,
    0
  );
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(
      state,
      action: PayloadAction<{
        product: ProductDetailData;
        variants?: ProductDetailData["variants"];
        variantIDs?: string[];
        quantity?: number;
      }>
    ) {
      const { product, variants, variantIDs, quantity = 1 } = action.payload;

      const generatedId = generateCartId(String(product.id), variantIDs);

      const existingItem = state.items.find(
        (item) =>
          item.productId === generatedId &&
          areVariantIDsEqual(item.variantIDs, variantIDs)
      );

      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        state.items.push({
          productId: generatedId,
          product,
          variants,
          variantIDs,
          quantity,
        });
      }

      recalcTotalQuantity(state);
    },

    removeFromCart(
      state,
      action: PayloadAction<{ product: ProductDetailData }>
    ) {
      const { product } = action.payload;

      state.items = state.items.filter(
        (item) =>
          !(
            item.product.name === product.name
          )
      );

      recalcTotalQuantity(state);
    },

    updateQuantity(
      state,
      action: PayloadAction<{ productId: string; quantity: number }>
    ) {
      const { productId, quantity } = action.payload;

      const item = state.items.find((i) => i.productId === productId);
      if (item) {
        item.quantity = Math.max(1, quantity);
      }

      recalcTotalQuantity(state);
    },

    clearCart(state) {
      state.items = [];
      state.totalQuantity = 0;
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } =
  cartSlice.actions;

export default cartSlice.reducer;