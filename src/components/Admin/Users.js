import {connect} from "react-redux";
import mapStateToProps from "../../constants/mapStateToProps";
import mapDispatchToProps from "../../constants/mapDispatchToProps";
import areStatePropsEqual from "../../constants/areStatePropsEqual";
import axios from "axios";
import {API_URL} from "../../constants/api";
import {useEffect} from "react";
import {Link, useNavigate} from "react-router-dom";

const Users = ({users, token, setUsers, deleteUser, setUserId, id}) => {

    const navigate = useNavigate();
    console.log(users)
    useEffect(() => {
        axios.get(API_URL + 'api/admin/users', {
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
        axios.delete(API_URL + `api/admin/users/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(response => deleteUser(id))
            .catch(error => console.log(error))

    }

    const handleShowUser = (id) => {
        setUserId(id)
        navigate('/user/' + id)
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
                        users && users.map((user, index) => {
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
                                        <button onClick={() => handleShowUser(user.id)}>
                                            <i className='fas fa-user-alt'></i>
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