import { configureStore } from "@reduxjs/toolkit";
import errorSlice from "./errorSlice";
import notificationSlice from "./notificationSlice";
import authenticationSlice from "./authenticationSlice";
import stylesSlice from "./stylesSlice";

export const store = configureStore({
    reducer: {
        error: errorSlice,
        notification: notificationSlice,
        authentication: authenticationSlice,
        styles: stylesSlice
    }
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch