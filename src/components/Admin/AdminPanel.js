
import {connect} from "react-redux";
import mapStateToProps from "../../constants/mapStateToProps";
import mapDispatchToProps from "../../constants/mapDispatchToProps";
import areStatePropsEqual from "../../constants/areStatePropsEqual";
import axios from "axios";
import {API_URL} from "../../constants/api";
import Users from "./Users";
import {Link, Outlet, useNavigate} from "react-router-dom"

const AdminPanel = ( { user, deleteToken, token } ) => {
    const navigate = useNavigate()
    const handleClickLogout = () => {
        axios.post(API_URL + 'api/admin/logout', {}, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(response => deleteToken())
            .catch(error => console.log(error))
    }

    return (
        <section className='AdminPanel'>
            <div>
                <div className='topNav'>
                    <h1>{user.name}</h1>
                    <Link to='/users'>users</Link>
                    <button onClick={handleClickLogout}>Logout</button>
                </div>
                <Outlet />
            </div>
        </section>
    )
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
    null,
    {areStatePropsEqual: areStatePropsEqual}
) (AdminPanel)