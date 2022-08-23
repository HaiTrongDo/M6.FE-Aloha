import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    email: "",
    avatar: "",
    displayName:'',
    userId:''
};
const UserSlice = createSlice({
    name: 'UserInfo',
    initialState: initialState
    ,
    reducers: {
        UserLoginWithGoogle: (state,action)=>{
            state.email = action.payload.email
            state.avatar = action.payload.avatar
            state.displayName = action.payload.displayName
            state.userId = action.payload.userId
        }
    }
})

export const {UserLoginWithGoogle} = UserSlice.actions

export default UserSlice.reducer
