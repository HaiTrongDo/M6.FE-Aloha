import {configureStore} from '@reduxjs/toolkit'
import clickSlide from './Features/SidebarOpenSlice/clickSlice'
import UserSlice from "./Features/CurrentUser/UserSlice";

const store = configureStore({
    reducer:{
        Layout: clickSlide.reducer,
        currentUser: UserSlice
    }
})

export default store