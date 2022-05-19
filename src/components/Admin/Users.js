import {connect} from "react-redux";
import mapStateToProps from "../../constants/mapStateToProps";
import mapDispatchToProps from "../../constants/mapDispatchToProps";
import areStatePropsEqual from "../../constants/areStatePropsEqual";
import axios from "axios";
import {API_URL} from "../../constants/api";
import {useEffect} from "react";

const Users = ({users, token, setUsers, deleteUser}) => {

    useEffect(() => {
        axios.get(API_URL + 'api/users', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(response => {
            console.log(response.data.users)
            setUsers(response.data.users)
        })
            .catch(error => console.log(error))
    }, [])

    const handleClickDeleteUser = id => {
        axios.delete(API_URL + `api/users/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(response => deleteUser(id))
            .catch(error => console.log(error))

    }


    return (
        <div className='Users'>
            <div>
                <table>
                    <tbody>
                    <tr className='headers'>
                        <td></td>
                        <td>name</td>
                        <td>email</td>
                        <td>role</td>
                        <td>email_verified_at</td>
                        <td>actions</td>
                    </tr>
                    {
                        users.map((user, index) => {
                            return (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>{user.role_id === 2 ? 'Client' : 'Admin'}</td>
                                    <td>{user.email_verified_at}</td>
                                    <td className='actions'>
                                        {
                                            user.role_id === 1 ?
                                                <button className='delete'>
                                                    <i className='fas fa-trash-alt'></i>
                                                </button>
                                                :
                                                <button className='delete'
                                                        onClick={() => handleClickDeleteUser(user.id)}
                                                >
                                                    <i className='fas fa-trash-alt'></i>
                                                </button>
                                        }

                                        <button className='change'>
                                            <i className='fas fa-pencil-alt'></i>
                                        </button>
                                    </td>
                                </tr>
                            )
                        })
                    }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
    null,
    {areStatePropsEqual: areStatePropsEqual}
)(Users);