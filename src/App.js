import {connect} from "react-redux";
import mapStateToProps from "./constants/mapStateToProps";
import mapDispatchToProps from "./constants/mapDispatchToProps";
import {Route, Routes, Navigate} from "react-router-dom";
import Login from "./components/Login";
import CentralPageUser from "./components/Client/ClientPanel";
import areStatePropsEqual from "./constants/areStatePropsEqual";
import Registration from "./components/Register";
import AdminPanel from "./components/Admin/AdminPanel";
import Users from "./components/Admin/Users";
import User from "./components/Admin/User";

function App({ token, user, id }) {

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
                            <Route path='/' element={<AdminPanel />}>
                                <Route path='users' element={<Users />}></Route>
                                <Route path='*' element={<Navigate to='/'/>}></Route>
                            </Route>
                            <Route path={'/user/' + id} element={<User />}/>
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
