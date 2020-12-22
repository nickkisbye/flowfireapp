import { Icon, initializeIcons } from '@fluentui/react';
import React from 'react';
import { Link } from 'react-router-dom';
import { IUserData } from '../providers/AuthProvider';
import './NavBar.css';

initializeIcons();

function NavBar(props: any) {
    const logOut = (): void => {
        localStorage.removeItem('token');
        window.location.href = "/";
    }

    return <React.Fragment>
        <div className="navbar">
            <img style={{ float: 'left' }} width="70" height="90" src="https://static.wixstatic.com/media/876796_73948a0cf77e4fc680da2fa584d19836.png/v1/fill/w_143,h_185,al_c,q_85/876796_73948a0cf77e4fc680da2fa584d19836.webp"/>
            <Link to="/">Home</Link>
            <Link to={`/profile/${props.id}`}>Profile</Link>
            <span style={{ float: 'right', cursor: 'pointer', padding: '20px', fontSize: '30px', color: '#ddcfd7'}} onClick={logOut}><Icon iconName="Leave" /></span>
        </div>
        {props.children}
    </React.Fragment>
}



export default NavBar;