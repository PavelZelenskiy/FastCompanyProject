import React from 'react';
import { useParams, Redirect } from 'react-router-dom';
import EditUserCard from '../components/page/editUserCard/editUserCard';
import UsersListPage from '../components/page/usersListPage/usersListPage';
import UserCard from '../components/page/userCard/userCard';
import UserProvider from '../hooks/useUsers';
import { useAuth } from '../hooks/useAuth';

const Users = () => {
    const params = useParams();
    const { userId, edit } = params;
    const { currentUser } = useAuth();

    return (
        <>
            <UserProvider>
                {userId ? (
                    edit ? (
                        userId === currentUser._id ? (
                            <EditUserCard />
                        ) : (
                            <Redirect to={`/users/${currentUser._id}/edit`} />
                        )
                    ) : (
                        <UserCard userId={userId} />
                    )
                ) : (
                    <UsersListPage />
                )}
            </UserProvider>
        </>
    );
};

export default Users;
