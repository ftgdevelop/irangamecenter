import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type Error = {
    title?: string;
    message?: string;
    isVisible: boolean;
    closeErrorLink?: string;
    closeButtonText?:string;
};

const initialState: Error = {
    title:"",
    message:"",
    isVisible: false
};

type PayloadParams = {
    message?: string;
    isVisible: boolean;
    title?: string;
    closeErrorLink?: string;
    closeButtonText?: string;
}

export const errorSlice = createSlice({
    name:"error",
    initialState,
    reducers:{
        setReduxError:(state, action: PayloadAction<PayloadParams>) =>{
            state.title = action.payload.title || "";
            state.message = action.payload.message;
            state.isVisible = action.payload.isVisible;
            state.closeErrorLink = action.payload.closeErrorLink;
            state.closeButtonText = action.payload.closeButtonText;
        }
    }
});

export const { setReduxError} = errorSlice.actions

export default errorSlice.reducer;