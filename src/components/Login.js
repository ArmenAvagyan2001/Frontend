import {connect} from "react-redux";
import mapStateToProps from "../constants/mapStateToProps";
import mapDispatchToProps from "../constants/mapDispatchToProps";
import {useState} from "react";
import axios from "axios";
import {API_URL} from "../constants/api";

const Login = ({setToken}) => {
    // data values
    const [email, setEmail] = useState(''),
        [password, setPassword] = useState(''),
        [value, setValue] = useState(true);

    // errors
    const [emailErr, setEmailErr] = useState(''),
        [passwordErr, setPasswordErr] = useState(''),
        [error, setError] = useState('');


    const handleClickLogin = () => {
        const data = {
            email,
            password
        }

        axios.post(API_URL + 'api/login', data)
            .then(response => {
                if (response.data.user.email_verified_at !== null) {
                    setToken(response.data.token, response.data.user);
                }else {
                    setError('you need to verify your email address');
                }

            }).catch(error => {
            console.log(error.response.data);
            if (email.length === 0 || email.includes('@') === false) {
                setEmailErr(error.response.data.errors.email[0]);
            } else {
                setEmailErr('');
            }

            if (email && password) {
                setError('wrong password or login')
            } else {
                setError('')
            }

            if (password.length === 0 || password.length < 6) {
                setPasswordErr(error.response.data.errors.password[0]);
            } else {
                setPasswordErr('');
            }
        })
    }

    return (
        <section className='Login'>
            <div className='div'>
                <label htmlFor='email'>Email</label><br/>
                <input id='email'
                       type='text'
                       placeholder='Email'
                       value={email}
                       onChange={e => setEmail(e.target.value)}
                /><br/>
                <small className='errors'>{emailErr}</small>
                <br/><br/>
                <div>
                    <label htmlFor='password'>Password</label><br/>
                    <input id='password'
                           type={value ? 'password' : 'text'}
                           placeholder='Password'
                           value={password}
                           onChange={e => setPassword(e.target.value)}
                    /><br/>
                    <small className='errors'>{passwordErr}</small>
                    <br/><br/>
                    <button className='icon'
                            onClick={() => setValue(!value)}
                    >
                        {value ? <i className='fas fa-eye'></i> : <i className='fas fa-eye-slash'></i>}
                    </button>
                </div>
                <button className='login'
                        onClick={handleClickLogin}
                >Login
                </button>
                <small>If you are not registered, you need to <a href="/registration">register</a></small><br/>
                <small className='errors'>{error}</small>
            </div>
        </section>
    )
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Login)