import React from 'react'

const SingedInMenu = ({ logout }) => {
    return (
        <li onClick={logout}><a href="">Log Out</a></li>
    )
}

export default SingedInMenu
