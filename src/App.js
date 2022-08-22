import store from './store';
import {Provider} from 'react-redux';
import {Routes, Route} from 'react-router-dom';
import LoginPage from "./Pages/LoginPage/LoginPage";
import UserHomePage from "./Pages/UserHomePage/UserHomePage";
import UserReportPage from "./Pages/UserReportPage/UserReportPage";
import UserBudgetPage from "./Pages/UserBudgetPage/UserBudgetPage";
import UserTransactionsPage from "./Pages/UserTransactionsPage/UserTransactionsPage";

function App() {
    return (
        <Provider store={store}>
            <div className="App">
                <Routes>
                    <Route path={`${process.env.PUBLIC_URL}/`} element={<UserHomePage />} />
                    <Route path={`${process.env.PUBLIC_URL}/login`} element={<LoginPage />} />
                    <Route path={`${process.env.PUBLIC_URL}/transactions`} element={<UserTransactionsPage />} />
                    <Route path={`${process.env.PUBLIC_URL}/report`} element={<UserReportPage />} />
                    <Route path={`${process.env.PUBLIC_URL}/budget`} element={<UserBudgetPage />} />
                    <Route path={`${process.env.PUBLIC_URL}/my-wallets`} element={<UserTransactionsPage />} />
                    <Route path={`${process.env.PUBLIC_URL}/my-account`} element={<UserTransactionsPage />} />
                    <Route path={`${process.env.PUBLIC_URL}/categories`} element={<UserTransactionsPage />} />
                    <Route path={`${process.env.PUBLIC_URL}/category`} element={<UserTransactionsPage />} />
                    <Route path={`${process.env.PUBLIC_URL}/search`} element={<UserTransactionsPage />} />
                    <Route path={`${process.env.PUBLIC_URL}/store`} element={<UserTransactionsPage />} />
                    <Route path={`${process.env.PUBLIC_URL}/help`} element={<UserTransactionsPage />} />
                </Routes>
            </div>
        </Provider>
    );
}

export default App;
