import store from './store';
import {Provider} from 'react-redux';
import {Routes, Route, Router} from 'react-router-dom';
import LoginPage from "./Pages/LoginPage/LoginPage";
import UserHomePage from "./Pages/UserHomePage/UserHomePage";
import UserReportPage from "./Pages/UserReportPage/UserReportPage";
import UserBudgetPage from "./Pages/UserBudgetPage/UserBudgetPage";
import UserTransactionsPage from "./Pages/UserTransactionsPage/UserTransactionsPage";
import MyWalletPage from "./Pages/MyWallet/MyWallet";
import PrivateRoute from './utils/PrivateRoute'
import UserChangeProfile from "./Pages/UserChangeProfile/UserChangeProfile";
import MyAccountPage from "./Pages/MyAccountPage/MyAccountPage";
import Category from "./Pages/Category/Category";
import UserSearchTransactionPage from "./Pages/UserSearchTransactionPage/UserSearchTransactionPage";
import AnimatedRoutes from "./Components/AnimatedRoutes";

function App() {
    return (
        <Provider store={store}>
            <div className="App">
                <AnimatedRoutes/>
            </div>
        </Provider>
    );
}

export default App;
