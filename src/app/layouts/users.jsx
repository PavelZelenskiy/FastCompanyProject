import React from 'react';
import { useParams } from 'react-router-dom';
import EditUserCard from '../components/page/editUserCard/editUserCard';
import UsersListPage from '../components/page/usersListPage/usersListPage';
import UserCard from '../components/page/userCard/userCard';

const Users = () => {
    const params = useParams();
    const { userId, edit } = params;

    return (
        <>
            {userId ? (
                edit ? (
                    <EditUserCard userId={userId} />
                ) : (
                    <UserCard userId={userId} />
                )
            ) : (
                <UsersListPage />
            )}
        </>
    );
};

export default Users;
