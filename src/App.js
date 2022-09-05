import store from './store';
import {Provider} from 'react-redux';
import {useState} from 'react'
import LoadingImage from './images/aloha-loading-screen.png'
import AnimatedRoutes from "./Components/AnimatedRoutes";
import {CircleLoader} from "react-spinners";


function App() {
    let [loading, setLoading] = useState(false);

    return (
        <Provider store={store}>
            <div className="App">
                {loading &&
                    <div
                        className="flex justify-center m-auto h-[100vh] w-full absolute loadingScreen bg-gray-900 opacity-75 z-[2000]">
                        <div className="h-[15%] w-[15%] block mx-auto my-[100px] opacity-100 ">
                            <img className='flex items-center '
                                 src={LoadingImage}
                                //  src={"https://firebasestorage.googleapis.com/v0/b/aloha-money.appspot.com/o/aloha-loading-screen.png?alt=media&token=402dd485-8f8b-47fa-bf99-9d23b15e248b"}
                                 alt="Aloha Loading"/>
                            <CircleLoader
                                color="#2EB74B"
                                cssOverride={{
                                    margin: "auto"
                                }}
                                size={60}
                                speedMultiplier={1}
                            />
                        </div>
                    </div>
                }
                <AnimatedRoutes setLoading={setLoading}/>
            </div>
        </Provider>
    );
}

export default App;
