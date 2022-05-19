
import {connect} from "react-redux";
import mapStateToProps from "../../constants/mapStateToProps";
import mapDispatchToProps from "../../constants/mapDispatchToProps";
import areStatePropsEqual from "../../constants/areStatePropsEqual";
import axios from "axios";
import {API_URL} from "../../constants/api";
import Users from "./Users";

const AdminPanel = ( { user, deleteToken, token } ) => {

    const handleClickLogout = () => {
        axios.post(API_URL + 'api/logout', {}, {
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
                    <button onClick={handleClickLogout}>Logout</button>
                </div>
                <Users />
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