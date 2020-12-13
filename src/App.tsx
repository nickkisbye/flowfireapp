import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import AuthProvider, { AuthContext } from './providers/AuthProvider';
import Home from './routes/Home';
import LoginForm from './components/LoginForm';
import { Container } from '@material-ui/core';
import Chat from './routes/ Chat';
import Friends from './routes/Friends';
import Settings from './routes/Profile';
import NavBar from './components/NavBar';

function App() {
  return (
    <React.Fragment>

      <AuthProvider>
        <AuthContext.Consumer>
          {({ user, isLoggedIn, token }: any) => {
            if (!isLoggedIn) {
              return <Container maxWidth="sm" style={{ marginTop: 80 }}><LoginForm /></Container>
            } else {
              return (
                <React.Fragment>
                  <Router>
                    <NavBar>
                      <Container maxWidth="sm" style={{ marginTop: 80 }}>
                        <Switch>
                          <Route exact path="/" component={Home} />
                          <Route exact path="/chat" component={Chat} />
                          <Route exact path="/friends" component={Friends} />
                          <Route exact path="/profile" component={Settings} />
                        </Switch>
                      </Container>
                    </NavBar>
                  </Router>
                </React.Fragment>
              );
            }
          }}
        </AuthContext.Consumer>
      </AuthProvider>
    </React.Fragment>
  );
}

export default App;
