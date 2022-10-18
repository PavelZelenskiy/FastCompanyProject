import React, { useState, useEffect } from 'react';
import QualitiesList from './qualitiesList';

const UserCard = ({ match, users, history }) => {
    const userId = match.params.userId;
    const [user, setUser] = useState();

    useEffect(() => {
        users.getById(userId).then((data) => setUser(data));
    }, []);

    const handleAllUsers = () => {
        history.push('/users');
    };

    return (
        <>
            {user ? (
                <div>
                    <h1>{user.name}</h1>
                    <h2>{`Профессия: ${user.profession.name}`}</h2>
                    <div>{<QualitiesList qualities={user.qualities} />}</div>
                    <div>{`completedMeetings: ${user.completedMeetings}`}</div>
                    <h2>{`Rate: ${user.rate}`}</h2>
                    <button
                        onClick={() => {
                            handleAllUsers();
                        }}
                    >
                        Все пользователи
                    </button>
                </div>
            ) : (
                <h1>Loading</h1>
            )}
        </>
    );
};

export default UserCard;
