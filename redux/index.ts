import { configureStore } from "@reduxjs/toolkit";
import errorSlice from "./errorSlice";
import notificationSlice from "./notificationSlice";
import authenticationSlice from "./authenticationSlice";
import stylesSlice from "./stylesSlice";
import pagesSlice from "./pages";

export const store = configureStore({
    reducer: {
        error: errorSlice,
        notification: notificationSlice,
        authentication: authenticationSlice,
        styles: stylesSlice,
        pages: pagesSlice
    }
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch