import {connect} from "react-redux";
import {useState} from "react";
import axios from "axios";
import {API_URL} from "../constants/api";
import mapDispatchToProps from "../constants/mapDispatchToProps";
import mapStateToProps from "../constants/mapStateToProps";
import areStatePropsEqual from "../constants/areStatePropsEqual";
import { useNavigate } from "react-router-dom";

const Registration = ({setToken, user}) => {
    const navigate = useNavigate();

    // data values
    const [value, setValue] = useState(true),
        [value2, setValue2] = useState(true),
        [name, setName] = useState(''),
        [email, setEmail] = useState(''),
        [password, setPassword] = useState(''),
        [password_confirmation, setPasswordConfirmation] = useState('');



    // functions
    const handleClickRegistration = () => {
        const data = {
            name,
            email,
            password,
            password_confirmation
        }


        axios.post(API_URL + 'api/register', data)
            .then(response => {
                navigate('/login');
                // setToken(response.data.token, response.data.user);
                // console.log(response.data.token, response.data.user.email_verified_at)
            })
            .catch(error => console.log(error.response))
    }

    return (
        <section className='Register'>
            <div>
                <label htmlFor='name'>Name</label><br/>
                <input id='name'
                       type='text'
                       placeholder='Name'
                       value={name}
                       onChange={e => setName(e.target.value)}
                /><br/><br/><br/>
                <label htmlFor='email'>Email</label><br/>
                <input id='email'
                       type='text'
                       placeholder='Email'
                       value={email}
                       onChange={e => setEmail(e.target.value)}
                /><br/><br/><br/>
                <label htmlFor='password'>Password</label><br/>
                <input id='password'
                       type={value ? 'password' : 'text'}
                       placeholder='Password'
                       value={password}
                       onChange={e => setPassword(e.target.value)}
                /><br/><br/><br/>
                <label htmlFor='password_confirmation'>Repeat password</label><br/>
                <input id='password_confirmation'
                       type={value2 ? 'password' : 'text'}
                       placeholder='Repeat password'
                       value={password_confirmation}
                       onChange={e => setPasswordConfirmation(e.target.value)}
                /><br/><br/><br/>
                <button className='icon'
                        onClick={() => setValue(!value)}
                >
                    {value ? <i className='fas fa-eye'></i> : <i className='fas fa-eye-slash'></i>}
                </button>
                <button className='icon2'
                        onClick={() => setValue2(!value2)}
                >
                    {value2 ? <i className='fas fa-eye'></i> : <i className='fas fa-eye-slash'></i>}
                </button>
                <button className='login'
                        onClick={handleClickRegistration}
                >Registration
                </button>
            </div>
        </section>
    )
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
    null,
    {areStatePropsEqual: areStatePropsEqual}
)(Registration)