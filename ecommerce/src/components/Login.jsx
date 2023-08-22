import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Auth-light.css';

const Login = ({ handleLogin, loginError, token }) => {
    const [Email, setEmail] = useState('');
    const [Password, setPassword] = useState('');
    const [RememberMe, setRemember] = useState(false);
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [shouldNavigate, setShouldNavigate] = useState(false);
    const navigate = useNavigate();

    

    useEffect(() => {
        if (shouldNavigate) {
            navigate('/dashboard');
        }
    }, [shouldNavigate, navigate]);

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setEmailError('');
        setPasswordError('');
        setErrorMessage('');

        if (!Email) {
            setEmailError('Please provide an email.');
            return;
        } else if (!validateEmail(Email)) {
            setEmailError('Please provide a valid email.');
            return;
        }

        if (!Password) {
            setPasswordError('Please provide a password.');
            return;
        }

        try {
            await handleLogin(Email, Password, RememberMe);
        } catch (error) {
            console.error('Login failed:', error);
            setErrorMessage('Invalid email or password.');
        }
    };

    return (
        <div className="content pt-12">
            <form id="login-form" className=' bg-purple-100 rounded-lg text-purple-800' method="post" onSubmit={handleSubmit}>
                <h2 className="login-title">Log in</h2>
                {loginError && <p style={{ color: 'red', textAlign: 'center' }}>{loginError}</p>}
                {errorMessage && <p style={{ color: 'red', textAlign: 'center' }}>{errorMessage}</p>}
                <div className="form-group mb-3">
                    <div className="input-group-icon right">
                        <div className="input-icon"><i className="fa fa-envelope"></i></div>
                        <input className="form-control" type="email" placeholder="Email" value={Email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    {emailError && <p style={{ color: 'red' }}>{emailError}</p>}
                </div>
                <div className="form-group mb-3">
                    <div className="input-group-icon right">
                        <div className="input-icon"><i className="fa fa-lock font-16"></i></div>
                        <input className="form-control" type="password" placeholder="Password" value={Password} onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    {passwordError && <p style={{ color: 'red' }}>{passwordError}</p>}
                </div>
                <div className="form-group mb-3 d-flex justify-content-between">
                    <label className="ui-checkbox ui-checkbox-info">
                        <input
                        className='text-white'
                            type="checkbox"
                            checked={RememberMe}
                            onChange={() => setRemember(!RememberMe)}
                        />
                        <span className="input-span"></span>Remember me</label>
                    <a href="forgot_password.html" className='float-right'>Forgot password?</a>
                </div>
                <div className=" mb-3 flex items-center content-center ml-28">
                    <button className="flex items-center content-center  mt-3 px-10 py-2 rounded-lg bg-purple-700 text-white" type="submit">Login</button>
                </div>
            </form>
        </div>
    );
};

export default Login;
