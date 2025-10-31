import { configureStore, combineReducers } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage"; 
import { persistReducer, persistStore } from "redux-persist";
import {
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

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

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["cart"], 
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;