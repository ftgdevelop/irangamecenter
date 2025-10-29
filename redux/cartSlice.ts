import { ProductVariant } from "@/types/commerce";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CartItem {
  id: string; 
  product: ProductVariant;
  quantity: number;
  attributes?: Record<string, string | string[]>; 
}

export interface CartState {
  items: CartItem[];
}

const initialState: CartState = {
  items: [],
};

/**
 * Normalize attribute record to a consistent string for comparison
 */
const serializeAttributes = (attributes?: Record<string, string | string[]>) => {
  if (!attributes) return "";
  return Object.entries(attributes)
    .map(([key, value]) => {
      const normalized =
        Array.isArray(value) ? value.sort().join(",") : String(value);
      return `${key}:${normalized}`;
    })
    .sort((a, b) => a.localeCompare(b))
    .join("|");
};

/**
 * Generates unique cart ID from base id + attributes
 */
const generateCartId = (
  baseId: string,
  attributes?: Record<string, string | string[]>
) => {
  const attrString = serializeAttributes(attributes);
  return attrString ? `${baseId}_${attrString}` : baseId;
};

/**
 * Deep attribute equality checker (for merge logic)
 */
const areAttributesEqual = (
  a?: Record<string, string | string[]>,
  b?: Record<string, string | string[]>
): boolean => {
  if (!a && !b) return true;
  if (!a || !b) return false;

  const aKeys = Object.keys(a);
  const bKeys = Object.keys(b);
  if (aKeys.length !== bKeys.length) return false;

  return aKeys.every((key) => {
    const aVal = a[key];
    const bVal = b[key];
    if (Array.isArray(aVal) && Array.isArray(bVal)) {
      return (
        aVal.length === bVal.length &&
        aVal.every((v) => bVal.includes(v))
      );
    }
    return aVal === bVal;
  });
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(
      state,
      action: PayloadAction<{
        id: string;
        product: ProductVariant;
        quantity: number;
        attributes?: Record<string, string | string[]>;
      }>
    ) {
      const { id, product, quantity, attributes } = action.payload;

      const existing = state.items.find(
        (item) =>
          item.product.id === product.id &&
          areAttributesEqual(item.attributes, attributes)
      );

      if (existing) {
        existing.quantity += quantity;
      } else {
        const cartId = generateCartId(id, attributes);
        state.items.push({
          id: cartId,
          product,
          quantity,
          attributes,
        });
      }
    },

    removeFromCart(state, action: PayloadAction<string>) {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },

    updateQuantity(
      state,
      action: PayloadAction<{ id: string; quantity: number }>
    ) {
      const item = state.items.find((i) => i.id === action.payload.id);
      if (item) item.quantity = Math.max(1, action.payload.quantity);
    },

    clearCart(state) {
      state.items = [];
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } =
  cartSlice.actions;

export default cartSlice.reducer;