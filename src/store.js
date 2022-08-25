import {configureStore} from '@reduxjs/toolkit'
import clickSlide from './Features/SidebarOpenSlice/clickSlice'
import openDialogAccountSlide from "./Features/DiaLogSlice/openDialogAccountSlide";
import openDialogChangePassSlide from "./Features/DiaLogSlice/openDialogChangePassSlice";
import openDialogMyWalletSlice from "./Features/DiaLogSlice/openDialogMyWalletSlice";
import UserSlice from "./Features/CurrentUser/UserSlice";
import transactionSlice from "./Features/DiaLogSlice/openDialogTransactionSlice";
import openDialogIconsSlice from "./Features/DiaLogSlice/openDialogIconsSlice";
import openDialogCategorySlice from "./Features/DiaLogSlice/openDialogCategorySlice";
import selectCategorySlice from "./Features/DiaLogSlice/categorySlice";
import walletSlice from "./Features/DiaLogSlice/openDialogWallet";
import selectWalletSlice from "./Features/DiaLogSlice/walletSlice";


const store = configureStore({
    reducer:{
        Layout: clickSlide.reducer,
        Dialog: openDialogAccountSlide.reducer,
        DialogPass: openDialogChangePassSlide.reducer,
        currentUser: UserSlice,
        dialogTransaction: transactionSlice.reducer,
        DialogWallet:openDialogMyWalletSlice.reducer,
        DialogIcons:openDialogIconsSlice.reducer,
        DialogCategory:openDialogCategorySlice.reducer,
        selectCategory:selectCategorySlice.reducer,
        dialogWallet:walletSlice.reducer,
        selectWallet:selectWalletSlice.reducer
    }
})

export default store