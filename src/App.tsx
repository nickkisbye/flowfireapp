import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import AuthProvider, { AuthContext } from './providers/AuthProvider';
import Home from './routes/Home';
import LoginForm from './components/LoginForm';
import { Container } from '@material-ui/core';
import Profile from './routes/Profile';
import NavBar from './components/NavBar';

function App() {
  return (
    <React.Fragment>

      <AuthProvider>
        <AuthContext.Consumer>
          {({ user, isLoggedIn }: any) => {
            if (!isLoggedIn) {
              return <Container maxWidth="sm" style={{ marginTop: 80 }}><LoginForm /></Container>
            } else {
              return (
                <React.Fragment>
                  <Router>
                    <NavBar {...user}>
                      <Container maxWidth="sm" style={{ marginTop: 120 }}>
                        <Switch>
                          <Route exact path="/" >
                            <Home {...user} />
                          </Route>
                          <Route path="/profile/:id" >
                            <Profile {...user} />
                          </Route>
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
