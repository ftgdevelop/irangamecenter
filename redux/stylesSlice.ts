import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type Mode = "dark" | "light";
type StylesInfo = {
    bodyScrollable: boolean;
    lastScrollPosition: number;
    headerUnderMain: boolean;
    progressLoading : boolean;
    mode: Mode;
};

const initialState: StylesInfo = {
    bodyScrollable: true,
    lastScrollPosition: 0,
    headerUnderMain: false,
    progressLoading: false,
    mode:"light"
};

export const stylesSlice = createSlice({
    name: "styles",
    initialState,
    reducers: {
        setBodyScrollable: (state, action : PayloadAction<boolean>) => {
            state.bodyScrollable = action.payload;
        },
        setBodiScrollPosition: (state, action : PayloadAction<number>) => {            
            state.lastScrollPosition = action.payload;
        }, 
        setHeaderUnderMain: (state, action) => {
            state.headerUnderMain = action.payload;
        },
        setProgressLoading: (state, action) => {
            state.progressLoading = action.payload;
        },
        setMode: (state, action : PayloadAction<Mode> ) => {
            state.mode = action.payload;
        }
    }
});

export const { setBodyScrollable, setHeaderUnderMain , setProgressLoading, setBodiScrollPosition, setMode} = stylesSlice.actions

export default stylesSlice.reducer;