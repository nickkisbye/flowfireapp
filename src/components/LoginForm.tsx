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
            <TextField style={{ background: '#333', color: 'white' }} label="Username" value={username} onChange={(event, newValue: any) => { setUsername(newValue) }} />
            <TextField style={{ background: '#333', color: 'white' }} label="Password" value={password} onChange={(event, newValue: any) => { setPassword(newValue) }} />
            <PrimaryButton text="Login" onClick={onLogin} style={{ marginTop: 20 }} />
            </form>
        </div>
    );   
}

export default LoginForm;