import React from 'react';
import NavBar from './components/navBar';
import Users from './components/users';
import { Route, Switch } from 'react-router-dom';
import Main from './components/main';
import Login from './components/login';
import UserCard from './components/userCard';
import API from './api';

function App() {
    return (
        <>
            <NavBar />
            <Switch>
                <Route path="/main" component={Main} />
                <Route path="/login" component={Login} />
                <Route
                    path="/users/:userId"
                    render={(props) => (
                        <UserCard users={API.users} {...props} />
                    )}
                />
                <Route path="/users" component={Users} />
            </Switch>
        </>
    );
}

export default App;
