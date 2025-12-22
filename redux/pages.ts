import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type Page = {
    headerType2Params:{
        title: string;
        backUrl: string;
        withLogo?: boolean;
    }
};

const initialState: Page = {
    headerType2Params:{
        backUrl:"",
        title:"",
        withLogo:false
    }
};

type PayloadParams = {
    title: string;
    backUrl: string;
    withLogo?: boolean;
}

export const pagesSlice = createSlice({
    name:"pages",
    initialState,
    reducers:{
        setHeaderType2Params:(state, action:PayloadAction<PayloadParams>) =>{
            state.headerType2Params.title = action.payload.title;
            state.headerType2Params.backUrl = action.payload.backUrl;
            if(action.payload.withLogo){
                state.headerType2Params.withLogo = true
            }
        }
    }
});

export const { setHeaderType2Params} = pagesSlice.actions

export default pagesSlice.reducer;