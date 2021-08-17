import React from 'react'

const Login = () => {
    return (
        <div>
            <h1>Log In</h1>
            <div className="row">
                <form className="col s12">
                    <div className="row">
                        <div className="input-field col s12">
                            <input id="email" type="email" className="validate" />
                            <label htmlFor="email">Email</label>
                        </div>
                    </div>
                    <div className="row">
                        <div className="input-field col s12">
                            <input id="password" type="password" className="validate" />
                            <label htmlFor="password">Password</label>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login
