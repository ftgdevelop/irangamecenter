import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type Page = {
    headerParams?:{
        share?: boolean;
        logo?: boolean;
        title?: string;
        productId?: number;
        cart?: boolean;
        backLink?: string;
    }
};

const initialState: Page = {
    headerParams:undefined
};

type PayloadParams = {
    headerParams?:{
        share?: boolean;
        logo?: boolean;
        title?: string;
        productId?: number;
        cart?: boolean;
        backLink?: string;
    }
}

export const pagesSlice = createSlice({
    name:"pages",
    initialState,
    reducers:{
        setHeaderParams:(state, action:PayloadAction<PayloadParams>) =>{
            state.headerParams = action.payload.headerParams;
        }
    }
});

export const { setHeaderParams} = pagesSlice.actions

export default pagesSlice.reducer;