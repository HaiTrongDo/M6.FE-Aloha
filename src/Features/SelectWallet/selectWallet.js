import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    iconObj: {
        url: '',
        _id: ''
    },
    currencyObj: {
        url: '',
        name: '',
        _id: ''
    },
    nameCurrency: '',
    initialBalance: 0
};
const WalletSlice = createSlice({
    name: 'SelectWalletIcon',
    initialState: initialState,
    reducers: {
        setIconObj: (state, action) => {
            state.iconObj = action.payload
        },
        setCurrencyObj: (state, action) => {
            state.currency = action.payload
        },
        setName: (state, action) => {
            state.name = action.payload
        },
        setInitialBalance: (state, action) => {
            state.initialBalance = action.payload
        }
    }
})

export const {setIconObj,setCurrencyObj,setName,setInitialBalance} = WalletSlice.actions

export default WalletSlice.reducer
