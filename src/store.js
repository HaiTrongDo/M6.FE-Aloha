import {configureStore} from '@reduxjs/toolkit'
import clickSlide from './Features/SidebarOpenSlice/clickSlice'
import openDialogAccountSlide from "./Features/DiaLogSlice/openDialogAccountSlide";
import openDialogChangePassSlide from "./Features/DiaLogSlice/openDialogChangePassSlice";
import openDialogMyWalletSlice from "./Features/DiaLogSlice/openDialogMyWalletSlice";
import UserSlice from "./Features/CurrentUser/UserSlice";
import transactionSlice from "./Features/DiaLogSlice/openDialogTransactionSlice";


const store = configureStore({
    reducer:{
        Layout: clickSlide.reducer,
        Dialog: openDialogAccountSlide.reducer,
        DialogPass: openDialogChangePassSlide.reducer,
        currentUser: UserSlice,
        dialogTransaction: transactionSlice.reducer,
        DialogWallet:openDialogMyWalletSlice.reducer
    }
})

export default store