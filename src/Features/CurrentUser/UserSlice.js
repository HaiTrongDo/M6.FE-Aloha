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
        UserLogin: (state,action)=>{
            state = action.payload
        }
    }
})

export default UserSlice
export const {addClick} = UserSlice.actions //de goi trong dispatch