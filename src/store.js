import {configureStore} from '@reduxjs/toolkit'
import clickSlide from './Features/SidebarOpenSlice/clickSlice'

const store = configureStore({
    reducer:{
        Layout: clickSlide.reducer
    }
})

export default store