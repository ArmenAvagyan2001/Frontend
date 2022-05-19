import {connect} from "react-redux";
import mapStateToProps from "./constants/mapStateToProps";
import mapDispatchToProps from "./constants/mapDispatchToProps";
import {Route, Routes, Navigate} from "react-router-dom";
import Login from "./components/Login";
import CentralPageUser from "./components/Client/ClientPanel";
import areStatePropsEqual from "./constants/areStatePropsEqual";
import Registration from "./components/Register";
import AdminPanel from "./components/Admin/AdminPanel";

function App({ token, user }) {

    return (
        <div>
            {
                token ?
                    user.role_id  === 2 ?
                        <Routes>
                            <Route path='/' element={<CentralPageUser/>}></Route>
                            <Route path='*' element={<Navigate to='/'/>}></Route>
                        </Routes>
                        :
                        <Routes>
                            <Route path='/' element={<AdminPanel />}/>
                            <Route path='*' element={<Navigate to='/'/>}></Route>
                        </Routes>
                    :
                    <Routes>
                        <Route path='/login' element={<Login/>}></Route>
                        <Route path='/registration' element={<Registration />}></Route>
                        <Route path='*' element={<Navigate to='/login'/>}></Route>
                    </Routes>
            }
        </div>
    )
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
    null,
    {areStatePropsEqual: areStatePropsEqual}
)(App);
