import { PrimaryButton, TextField } from '@fluentui/react';
import '../App.css';
import Axios from 'axios';
import React, { useState } from 'react';

function LoginForm() {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const onLogin = async () => {
        const token: string = await (await Axios.post('http://localhost:8080/token', { username, password })).data;
         console.log(token);
        if (token) localStorage.setItem('token', token);
        window.location.href = "/";
    };

    return (
        <div>
            <TextField style={{ background: '#333', color: 'white' }} label="Username" value={username} onChange={(event, newValue: any) => { setUsername(newValue) }} />
            <TextField style={{ background: '#333', color: 'white' }} label="Password" value={password} onChange={(event, newValue: any) => { setPassword(newValue) }} />
            <PrimaryButton text="Login" onClick={onLogin} style={{ marginTop: 20 }} />
        </div>
    );   
}

export default LoginForm;