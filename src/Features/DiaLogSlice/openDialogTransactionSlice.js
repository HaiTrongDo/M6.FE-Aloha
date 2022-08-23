import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    value: false
}

export const transactionSlice = createSlice({
    name: 'transaction',
    initialState,
    reducers: {
        openDialogTransaction: (state,action) => {
            state.value = action.payload
        },
        closeDialogTransaction: (state,action) => {
            state.value = action.payload
        }
    },
})

export const {openDialogTransaction,closeDialogTransaction} = transactionSlice.actions

export default transactionSlice