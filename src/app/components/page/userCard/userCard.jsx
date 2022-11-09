import React, { useState, useEffect } from 'react';
import Qualities from '../../ui/qualities';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import API from '../../../api';

const UserCard = ({ userId }) => {
    const history = useHistory();
    const [user, setUser] = useState();

    useEffect(() => {
        API.users.getById(userId).then((data) => setUser(data));
    }, []);
    const handleClick = () => {
        history.push('/users');
    };
    if (user) {
        return (
            <div>
                <h1> {user.name}</h1>
                <h2>Профессия: {user.profession.name}</h2>
                <Qualities qualities={user.qualities} />
                <p>completedMeetings: {user.completedMeetings}</p>
                <h2>Rate: {user.rate}</h2>
                <button
                    onClick={() => {
                        history.push(`/users/${userId}/edit`);
                    }}
                >
                    {' '}
                    Редактировать
                </button>
                <div className="mt-2">
                    <button onClick={handleClick}> Все пользователи</button>
                </div>
            </div>
        );
    } else {
        return <h1>Loading</h1>;
    }
};

UserCard.propTypes = {
    userId: PropTypes.string.isRequired
};

export default UserCard;
