import MyAccount from "../../Components/Layouts/MyAccount/MyAccount";
import {Routes, Route} from "react-router-dom";


const UserMyAccountPage = () => {
    return (
        <div>
            <MyAccount>
                <h1> this is the My Account page</h1>
                <Routes>
                <Route path={'/change-profile'} element={<h1>testing</h1>} />
                </Routes>
            </MyAccount>
        </div>
    );
};

export default UserMyAccountPage;