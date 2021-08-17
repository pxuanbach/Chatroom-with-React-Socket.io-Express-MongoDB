import React, {useState} from 'react'

const Signup = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [nameError, setNameError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const handleSubmit = event => {
        event.preventDefault();
        console.log(name, email, password);
    }
    return (
        <div>
            <h1>Sign Up</h1>
            <div className="row">
                <form action="" className="col s12" onSubmit={handleSubmit}>
                    <div className="row">
                        <div className="input-field col s12">
                            <input  id="name" type="text" className="validate" 
                            value={name} 
                            onChange={event => setName(event.target.value)}/>
                            <div className="name error red-text">{nameError}</div>
                            <label htmlFor="name">Name</label>
                        </div>
                    </div>
                    <div className="row">
                        <div className="input-field col s12">
                            <input id="email" type="email" className="validate" 
                            value={email} 
                            onChange={event => setEmail(event.target.value)}/>
                            <div className="name error red-text">{emailError}</div>
                            <label htmlFor="email">Email</label>
                        </div>
                    </div>
                    <div className="row">
                        <div className="input-field col s12">
                            <input id="password" type="password" className="validate" 
                            value={password} 
                            onChange={event => setPassword(event.target.value)}/>
                            <div className="name error red-text">{passwordError}</div>
                            <label htmlFor="password">Password</label>
                        </div>
                    </div>
                    <button className="btn">Sign up</button>
                </form>
            </div>
        </div>
    )
}

export default Signup
