import React from 'react';
import Axios from 'axios';

export const AuthContext: any = React.createContext(null);

interface AuthProviderState {
    user: IUser;
    isLoggedIn: boolean;
    token: string;
}

interface IUser {
    username: string;
    email: string;
    fullname: string;
}

export default class AuthProvider extends React.Component<{}, AuthProviderState> {

    componentDidMount() {
        const token = localStorage.getItem('token');
        if(!token) {
            this.setState({ isLoggedIn: false, token: '', user: { username: '', email: '', fullname: '' } });
        } else {
            this.setState({ token: token, isLoggedIn: true });
        }
    
    }

    constructor(props: any) {
        super(props);
        this.state = {
            user: { username: '', email: '', fullname: '' },
            isLoggedIn: false,
            token: ''
        }
    }

    render() {
        return(
            <AuthContext.Provider value={this.state}>
                {this.props.children}
            </AuthContext.Provider>
        );
    }
}