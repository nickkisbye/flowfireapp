import React from 'react';
import Axios from 'axios';
import { environment } from '../App';

export const AuthContext: any = React.createContext(null);

interface AuthProviderState {
    user: IUserData | null;
    isLoggedIn: boolean;
}

export interface IUserData extends IUser {
    token: string;
}

interface IUser {
    fireFlow: { id: number, username: string } | null
    id: number;
    role: { id: number, name: string };
    steam: { steamid: string, username: string} | null
    username: string;
}

export default class AuthProvider extends React.Component<{}, AuthProviderState> {

    componentDidMount() {
        const token: string | null = localStorage.getItem('token');

        if(!token) {
            this.setState({ isLoggedIn: false, user: null });
        } else {
            Axios.post(`http://${environment}:8080/me/`, {}, {
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            })
            .then((response) => {
                if(!response.data) {
                    this.setState({ isLoggedIn: false, user: null });
                } else {
                    response.data.token = token;
                    this.setState({ user: response.data, isLoggedIn: true });
                }
            });
        }
    
    }

    constructor(props: any) {
        super(props);
        this.state = {
            user: null,
            isLoggedIn: false
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