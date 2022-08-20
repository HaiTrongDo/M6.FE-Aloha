import './App.css';
import store from './store';
import {Provider} from 'react-redux';
import {Routes, Route} from 'react-router-dom';
import UserHomePage from "./Pages/UserHomePage/UserHomePage";
import UserReportPage from "./Pages/UserReportPage/UserReportPage";
import UserBudgetPage from "./Pages/UserBudgetPage/UserBudgetPage";

function App() {
    return (
        <Provider store={store}>
            <div className="App">
                <Routes>
                    <Route path={`${process.env.PUBLIC_URL}/`} element={<UserHomePage />} />
                    <Route path={`${process.env.PUBLIC_URL}/report`} element={<UserReportPage />} />
                    <Route path={`${process.env.PUBLIC_URL}/budget`} element={<UserBudgetPage />} />
                    <Route path={`${process.env.PUBLIC_URL}/my-wallets`} element={<UserHomePage />} />
                    <Route path={`${process.env.PUBLIC_URL}/my-account`} element={<UserHomePage />} />
                    <Route path={`${process.env.PUBLIC_URL}/categories`} element={<UserHomePage />} />
                    <Route path={`${process.env.PUBLIC_URL}/category`} element={<UserHomePage />} />
                    <Route path={`${process.env.PUBLIC_URL}/search`} element={<UserHomePage />} />
                    <Route path={`${process.env.PUBLIC_URL}/store`} element={<UserHomePage />} />
                    <Route path={`${process.env.PUBLIC_URL}/help`} element={<UserHomePage />} />
                </Routes>
            </div>
        </Provider>
    );
}

export default App;
