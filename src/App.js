import './App.css';
import store from './store';
import {Provider} from 'react-redux';
import {Routes, Route} from 'react-router-dom';
import LoginPage from "./Pages/LoginPage/LoginPage";

function App() {
    return (
        <Provider store={store}>
            <div className="App">
                <Routes>
                    <Route path='/login' element={<LoginPage/>}/>
                </Routes>
            </div>
        </Provider>
    );
}

export default App;
