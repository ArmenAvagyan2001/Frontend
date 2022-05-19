import {connect} from "react-redux";
import mapStateToProps from "../../constants/mapStateToProps";
import mapDispatchToProps from "../../constants/mapDispatchToProps";
import {API_URL} from "../../constants/api";
import axios from "axios";
import Posts from "./Posts";
import areStatePropsEqual from "../../constants/areStatePropsEqual";
import AddPost from "./AddPost";

const ClientPanel = ( { user, deleteToken, token } ) => {

    const handleClickLogout = () => {
        axios.post(API_URL + 'api/logout', {}, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(response => deleteToken())
            .catch(error => console.log(error))
    }
    return (
        <section className='ClientPanel'>
            <div>
                <div className='topNav'>
                    <h1>{user.name}</h1>
                    <button onClick={handleClickLogout}>Logout</button>
                </div>
                <AddPost />
                <Posts />
            </div>
        </section>
    )
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
    null,
    {areStatePropsEqual: areStatePropsEqual}
)(ClientPanel)