import {createSlice} from "@reduxjs/toolkit";

const initialState = {
};
const UserSlice = createSlice({
    name: 'UserInfo',
    initialState: {
        currentUser:initialState
    }
    ,
    reducers: {
        UserLoginWithFireBase: (state,action)=>{
            state.currentUser = action.payload
        },
        updateUserInfo: (state,action)=>{
            state.currentUser = action.payload
        }
    }
})

export const {UserLoginWithFireBase, updateUserInfo} = UserSlice.actions

export default UserSlice.reducer
