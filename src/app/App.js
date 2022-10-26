import React from 'react';
import NavBar from './components/navBar';

import { Route, Switch } from 'react-router-dom';

import UserCard from './components/userCard';
import API from './api';
import Main from './layouts/main';
import Login from './layouts/login';
import Users from './layouts/users';

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
