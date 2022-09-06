import {Route, Routes, useLocation} from "react-router-dom";
import PrivateRoute from "../utils/PrivateRoute";
import UserHomePage from "../Pages/UserHomePage/UserHomePage";
import UserTransactionsPage from "../Pages/UserTransactionsPage/UserTransactionsPage";
import UserReportPage from "../Pages/UserReportPage/UserReportPage";
import UserBudgetPage from "../Pages/UserBudgetPage/UserBudgetPage";
import MyWalletPage from "../Pages/MyWallet/MyWallet";
import MyAccountPage from "../Pages/MyAccountPage/MyAccountPage";
import UserChangeProfile from "../Pages/UserChangeProfile/UserChangeProfile";
import Category from "../Pages/Category/Category";
import UserSearchTransactionPage from "../Pages/UserSearchTransactionPage/UserSearchTransactionPage";
import LoginPage from "../Pages/LoginPage/LoginPage";
import {AnimatePresence} from "framer-motion"

import {useEffect} from 'react'
import {useSelector} from "react-redux";
import {ResetPassword} from "../Pages/ResetPassword/ResetPassword";


export default function AnimatedRoutes({setLoading}) {
    const location = useLocation();
    const isLoadingScreen = useSelector(store => store.isLoadingScreenSlice.isLoadingScreen)

    useEffect(() => {
        setLoading(isLoadingScreen)
    })
    return (


        <AnimatePresence>
            <Routes location={location} key={location.pathname}>
                <Route element={<PrivateRoute/>}>
                    <Route path="/" element={<UserHomePage/>}/>
                    <Route path="/transactions" element={<UserTransactionsPage/>}/>
                    <Route path="/report" element={<UserReportPage/>}/>
                    <Route path="/budget" element={<UserBudgetPage/>}/>
                    <Route path="/my-wallets" element={<MyWalletPage/>}/>
                    <Route path="/my-account" element={<MyAccountPage/>}/>
                    <Route path="/my-account/change-profile" element={<UserChangeProfile/>}/>
                    <Route path="/categories" element={<Category/>}/>
                    <Route path="/search" element={<UserSearchTransactionPage/>}/>
                    <Route path="/store" element={<UserTransactionsPage/>}/>
                    <Route path="/help" element={<UserTransactionsPage/>}/>
                    <Route path="/reset-password" element={<ResetPassword/>}/>
                </Route>
                <Route path="/login" element={<LoginPage/>}/>
            </Routes>
        </AnimatePresence>

    )
}