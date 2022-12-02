import React from 'react';
import { useParams } from 'react-router-dom';
import EditUserCard from '../components/page/editUserCard/editUserCard';
import UsersListPage from '../components/page/usersListPage/usersListPage';
import UserCard from '../components/page/userCard/userCard';
import UserProvider from '../hooks/useUsers';

const Users = () => {
    const params = useParams();
    const { userId, edit } = params;

    return (
        <>
            <UserProvider>
                {userId ? (
                    edit ? (
                        <EditUserCard userId={userId} />
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
