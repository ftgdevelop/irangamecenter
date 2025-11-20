import { configureStore, combineReducers } from "@reduxjs/toolkit";

import errorSlice from "./errorSlice";
import notificationSlice from "./notificationSlice";
import authenticationSlice from "./authenticationSlice";
import stylesSlice from "./stylesSlice";
import pagesSlice from "./pages";
import productsSlice from "./productsSlice";
import cartSlice from "./cartSlice";

const rootReducer = combineReducers({
  error: errorSlice,
  notification: notificationSlice,
  authentication: authenticationSlice,
  styles: stylesSlice,
  pages: pagesSlice,
  products: productsSlice,
  cart: cartSlice,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;