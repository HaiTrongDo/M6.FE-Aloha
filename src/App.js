import './App.css';
import store from './store';
import {Provider} from 'react-redux';
import {Routes, Route} from 'react-router-dom';
import UserHomePage from "./pages/UserHomePage/UserHomePage";
import UserReportPage from "./pages/UserReportPage/UserReportPage";
import BudgetLayout from "./components/layout/Budget/BudgetLayout";

function App() {
    return (
        <Provider store={store}>
            <div className="App">
                <Routes>
                    <Route path="/" element={<UserHomePage />} />
                    <Route path="/report" element={<UserReportPage />} />
                    <Route path="/budget" element={<BudgetLayout />} />
                    <Route path="/my-wallets" element={<UserHomePage />} />
                    <Route path="/my-account" element={<UserHomePage />} />
                    <Route path="/categories" element={<UserHomePage />} />
                    <Route path="/category" element={<UserHomePage />} />
                    <Route path="/search" element={<UserHomePage />} />
                    <Route path="/store" element={<UserHomePage />} />
                    <Route path="/help" element={<UserHomePage />} />
                </Routes>
            </div>
        </Provider>
    );
}

export default App;
