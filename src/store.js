import {configureStore} from '@reduxjs/toolkit'
import clickSlide from './Features/SidebarOpenSlice/clickSlice'
import openDialogAccountSlide from "./Features/DiaLogSlice/openDialogAccountSlide";
import openDialogChangePassSlide from "./Features/DiaLogSlice/openDialogChangePassSlice";
import openDialogMyWalletSlice from "./Features/DiaLogSlice/openDialogMyWalletSlice";
import UserSlice from "./Features/CurrentUser/UserSlice";
import WalletSlice from "./Features/SelectWallet/selectWallet";
import WalletIdSlice from "./Features/SelectWallet/walletIdSlice";
import transactionSlice from "./Features/DiaLogSlice/openDialogTransactionSlice";
import openDialogIconsSlice from "./Features/DiaLogSlice/openDialogIconsSlice";
import openDialogCategorySlice from "./Features/DiaLogSlice/openDialogCategorySlice";
import openDialogCurrencySlice from "./Features/DiaLogSlice/openDialogCurrencySlice";
import selectCategorySlice from "./Features/DiaLogSlice/categorySlice";
import walletTransactionSlice from "./Features/DiaLogSlice/openDialogWallet";
import selectWalletSlice from "./Features/DiaLogSlice/walletSlice";
import openDialogDetailSlice from "./Features/DiaLogSlice/openDialogDetailSlice";


const store = configureStore({
    reducer:{
        Layout: clickSlide.reducer,
        Dialog: openDialogAccountSlide.reducer,
        DialogPass: openDialogChangePassSlide.reducer,
        currentUser: UserSlice,
        dialogTransaction: transactionSlice.reducer,
        DialogWallet:openDialogMyWalletSlice.reducer,
        DialogIcons:openDialogIconsSlice.reducer,
        DialogTransactionCategory:openDialogCategorySlice.reducer,
        selectCategory:selectCategorySlice.reducer,
        dialogWallet:walletTransactionSlice.reducer,
        selectWallet:selectWalletSlice.reducer,
        DialogCurrency:openDialogCurrencySlice.reducer,
        DialogCategory:openDialogCategorySlice.reducer,
        DialogDetail:openDialogDetailSlice.reducer,
        wallet: WalletSlice,
        walletId: WalletIdSlice,

    }
})

export default store