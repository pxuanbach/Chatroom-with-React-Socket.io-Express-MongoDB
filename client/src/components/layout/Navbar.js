import React, { useContext } from 'react'
import { UserContext } from '../../UserContext';
import SingedInMenu from './SingedInMenu';
import SingedOutMenu from './SingedOutMenu';

const Navbar = () => {
    const { user, setUser } = useContext(UserContext);
    const logout = async () => {
        try {
            const res = await fetch('http://localhost:8082/logout', {
                credentials: 'include',
            });
            const data = res.json();
            console.log('logout data', data);
            setUser(null);
        } catch (error) {
            console.log(error)
        }
    }
    const menu = user ? <SingedInMenu logout={logout}/> : <SingedOutMenu/>
    return (
        <>
            <nav className="green">
                <div className="nav-wrapper">
                    <a href="/" className="brand-logo">ChatRoom</a>
                    <a href="#" data-target="mobile-demo" class="sidenav-trigger"><i class="material-icons">menu</i></a>
                    <ul id="nav-mobile" className="right hide-on-med-and-down">
                        {menu}
                    </ul>
                </div>
            </nav>
            <ul className="sidenav" id="mobile-demo">
                {menu}
            </ul>

        </>
    )
}

export default Navbar
