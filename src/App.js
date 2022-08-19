import './App.css';
import {store} from './store';
import {Provider} from 'react-redux';
import {Routes, Route} from 'react-router-dom';

function App() {
    return (
        <Provider store={store}>
            <div className="App">
                <Routes>
                    <Route/>
                </Routes>
            </div>
        </Provider>
    );
}

export default App;
