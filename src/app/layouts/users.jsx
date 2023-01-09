import React from 'react';
import { useParams, Redirect } from 'react-router-dom';
import EditUserCard from '../components/page/editUserCard/editUserCard';
import UsersListPage from '../components/page/usersListPage/usersListPage';
import UserCard from '../components/page/userCard/userCard';
import { useSelector } from 'react-redux';
import { getCurrentUserId } from '../store/users';
import UsersLoader from '../components/ui/hoc/usersLoader';

const Users = () => {
    const params = useParams();
    const { userId, edit } = params;
    const currentUserId = useSelector(getCurrentUserId());

    return (
        <>
            <UsersLoader>
                {userId ? (
                    edit ? (
                        userId === currentUserId ? (
                            <EditUserCard />
                        ) : (
                            <Redirect to={`/users/${currentUserId}/edit`} />
                        )
                    ) : (
                        <UserCard userId={userId} />
                    )
                ) : (
                    <UsersListPage />
                )}
            </UsersLoader>
        </>
    );
};

export default Users;
