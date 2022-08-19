import {configureStore} from '@reduxjs/toolkit'
import clickSlide from './components/layout/clickSlice'

const store = configureStore({
    reducer:{
        Layout: clickSlide.reducer
    }
})

export default store