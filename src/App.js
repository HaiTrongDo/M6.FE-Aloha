import store from './store';
import {Provider} from 'react-redux';
import {Routes, Route} from 'react-router-dom';
import LoginPage from "./Pages/LoginPage/LoginPage";
import UserHomePage from "./Pages/UserHomePage/UserHomePage";
import UserReportPage from "./Pages/UserReportPage/UserReportPage";
import UserBudgetPage from "./Pages/UserBudgetPage/UserBudgetPage";
import UserTransactionsPage from "./Pages/UserTransactionsPage/UserTransactionsPage";
import MyWalletPage from "./Pages/MyWallet/MyWallet";
import PrivateRoute from './utils/PrivateRoute'
import UserChangeProfile from "./Pages/UserChangeProfile/UserChangeProfile";
import MyAccountPage from "./Pages/MyAccountPage/MyAccountPage";

function App() {
    return (
        <Provider store={store}>
            <div className="App">
                <Routes>
                    <Route element={<PrivateRoute/>}>

                    <Route path="/" element={<UserHomePage/>}/>
                    </Route>
                    <Route path="/login" element={<LoginPage/>}/>
                    <Route path="/transactions" element={<UserTransactionsPage/>}/>
                    <Route path="/report" element={<UserReportPage/>}/>
                    <Route path="/budget" element={<UserBudgetPage/>}/>
                    <Route path="/my-wallets" element={<MyWalletPage/>}/>
                    <Route path="/my-account" element={<MyAccountPage />} />
                        <Route path="/my-account/change-profile" element={<UserChangeProfile />} />
                    <Route path="/categories" element={<UserTransactionsPage/>}/>
                    <Route path="/category" element={<UserTransactionsPage/>}/>
                    <Route path="/search" element={<UserTransactionsPage/>}/>
                    <Route path="/store" element={<UserTransactionsPage/>}/>
                    <Route path="/help" element={<UserTransactionsPage/>}/>
                </Routes>
            </div>
        </Provider>
    );
}

export default App;
