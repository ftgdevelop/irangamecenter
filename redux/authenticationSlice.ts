import { UserInformation } from "@/types/authentication";
import { createSlice } from "@reduxjs/toolkit";

type Authentication = {
    isAuthenticated: boolean;
    getUserLoading: boolean;
    user?: UserInformation | undefined;
    balance?: number;
    balanceCurrency: "IRR" | string,
    balanceLoading? : boolean;
    loginFormIsOpen?: boolean;
    loginToContinueReserve?: boolean;
};

const initialState: Authentication = {
    isAuthenticated: false,
    getUserLoading: true,
    user: undefined,
    balance: undefined,
    balanceCurrency: "",
    balanceLoading: false,
    loginFormIsOpen: false,
    loginToContinueReserve:false
};

export const authenticationSlice = createSlice({
    name: "authentication",
    initialState,
    reducers: {
        setReduxUser: (state, action) => {
            state.isAuthenticated = action.payload.isAuthenticated;
            state.user = action.payload.user;
            state.getUserLoading = action.payload.getUserLoading;
        },
        setReduxBalance: (state, action) => {
            state.balance = action.payload.balance;
            state.balanceLoading = action.payload.loading;
            state.balanceCurrency = action.payload.currency
        },
        openLoginForm : (state) =>{
            state.loginFormIsOpen = true;
        },
        closeLoginForm : (state) =>{
            state.loginFormIsOpen = false;
        },
        setLoginToContinueReserve:(state, action) => {
            state.loginToContinueReserve = action.payload;
        }

    }
});

export const { setReduxUser, setReduxBalance, closeLoginForm, openLoginForm , setLoginToContinueReserve} = authenticationSlice.actions

export default authenticationSlice.reducer;