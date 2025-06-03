import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type Page = {
    headerType2Params:{
        title: string;
        backUrl: string;
    }
};

const initialState: Page = {
    headerType2Params:{
        backUrl:"",
        title:""
    }
};

type PayloadParams = {
    title: string;
    backUrl: string;
}

export const pagesSlice = createSlice({
    name:"pages",
    initialState,
    reducers:{
        setHeaderType2Params:(state, action:PayloadAction<PayloadParams>) =>{
            state.headerType2Params.title = action.payload.title;
            state.headerType2Params.backUrl = action.payload.backUrl;
        }
    }
});

export const { setHeaderType2Params} = pagesSlice.actions

export default pagesSlice.reducer;