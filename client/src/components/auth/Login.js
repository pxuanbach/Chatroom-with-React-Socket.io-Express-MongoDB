import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../UserContext';
import { Redirect } from 'react-router-dom';

const Login = () => {
    const { user, setUser } = useContext(UserContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const handleSubmit = async event => {
        event.preventDefault();
        setEmailError('');
        setPasswordError('');
        try {
            const res = await fetch('http://localhost:8082/login', {
                method: 'POST',
                credentials: 'include',
                body: JSON.stringify({ email, password }),
                headers: { 'Content-Type': 'application/json' }
            })
            const data = await res.json();
            console.log(data)
            if (data.errors) {
                setEmailError(data.errors.email);
                setPasswordError(data.errors.password);
            }
            if (data.user) {
                setUser(data.user);
            }
        } catch (error) {
            console.log(error)
        }
    }
    if (user) {
        return <Redirect to='/' />
    }
    return (
        <div>
            <h1>Log In</h1>
            <div className="row">
                <form className="col s12" onSubmit={handleSubmit}>
                    <div className="row">
                        <div className="input-field col s12">
                            <input id="email" type="email" className="validate"
                                value={email}
                                onChange={event => setEmail(event.target.value)} />
                            <div className="name error red-text">{emailError}</div>
                            <label htmlFor="email">Email</label>
                        </div>
                    </div>
                    <div className="row">
                        <div className="input-field col s12">
                            <input id="password" type="password" className="validate"
                                value={password}
                                onChange={event => setPassword(event.target.value)} />
                            <div className="name error red-text">{passwordError}</div>
                            <label htmlFor="password">Password</label>
                        </div>
                    </div>
                    <button className="btn">Log In</button>
                </form>
            </div>
        </div>
    )
}

export default Login
