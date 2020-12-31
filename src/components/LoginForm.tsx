import { PrimaryButton, TextField } from '@fluentui/react';
import '../App.css';
import Axios from 'axios';
import React, { useState } from 'react';
import { environment } from '../App';

function LoginForm() {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const onLogin = async (): Promise<void> => {
        const { data } = await (await Axios.post(`http://${environment}:8080/token`, { username, password }));
        if (data.token) localStorage.setItem('token', data.token);
        window.location.href = "/";
    };

    return (
        <div>
            <form onSubmit={onLogin}>
            <TextField style={{ background: '#fff', color: '#333' }} label="Username" value={username} onChange={(event, newValue: any) => { setUsername(newValue) }} />
            <TextField style={{ background: '#fff', color: '#333' }} label="Password" value={password} onChange={(event, newValue: any) => { setPassword(newValue) }} />
            <PrimaryButton text="Login" onClick={onLogin} style={{ marginTop: 15, background: '#eb4914', border: 'none', padding: '25px', width: '100%', fontSize: '20px' }} />
            </form>
        </div>
    );   
}

export default LoginForm;