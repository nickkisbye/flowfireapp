import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css';

function NavBar(props: any) {
    return <React.Fragment>
        <div className="navbar">
            <Link to="/">Home</Link>
            <Link to="/chat">Chat</Link>
            <Link to="/friends">Friends</Link>
            <Link to="/profile">Profile</Link>
            <a onClick={() => {
                localStorage.removeItem('token');
                window.location.href = "/";
            }}>Logout</a>
        </div>
        {props.children}
    </React.Fragment>
}

export default NavBar;