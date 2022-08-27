import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    value: {}
}

export const selectWalletSlice = createSlice({
    name: 'transaction',
    initialState,
    reducers: {
        selectWallet: (state,action) => {
            state.value = action.payload
        },
    },
})

export const {selectWallet} = selectWalletSlice.actions

export default selectWalletSlice