import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    email: "",
    avatar: "",
    displayName:''
};
const UserSlice = createSlice({
    name: 'UserInfo',
    initialState: {
        value: initialState
    },
    reducers: {
        UserLoginWithGoogle: (state,action)=>{
            state.email = action.payload.email
            state.avatar = action.payload.avatar
            state.displayName = action.payload.displayName
        }
    }
})

export const {UserLoginWithGoogle} = UserSlice.actions

export default UserSlice.reducer
