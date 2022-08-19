import './App.css';
import store from './store';
import {Provider} from 'react-redux';
import {Routes, Route} from 'react-router-dom';
import UserHomePage from "./pages/UserHomePage/UserHomePage";

function App() {
    return (
        <Provider store={store}>
            <div className="App">
                <Routes>
                    <Route path="/" element={<UserHomePage />} />
                </Routes>
            </div>
        </Provider>
    );
}

export default App;
