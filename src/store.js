import {configureStore} from '@reduxjs/toolkit'
import clickSlide from './Features/SidebarOpenSlice/clickSlice'
import openDialogAccountSlide from "./Features/DiaLogSlice/openDialogAccountSlide";
import openDialogChangePassSlide from "./Features/DiaLogSlice/openDialogChangePassSlice";
import openDialogMyWalletSlice from "./Features/DiaLogSlice/openDialogMyWalletSlice";
import UserSlice from "./Features/CurrentUser/UserSlice";


const store = configureStore({
    reducer:{
        Layout: clickSlide.reducer,
        Dialog: openDialogAccountSlide.reducer,
        DialogPass: openDialogChangePassSlide.reducer,
        currentUser: UserSlice,
        DialogWallet:openDialogMyWalletSlice.reducer
    }
})

export default store