import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import API from '../../../api';
import UserInfoCard from '../../ui/userInfoCard';
import QualitiesCard from '../../ui/qualitiesCard';
import MeetingsCard from '../../ui/meetingsCard';
import Comments from '../../ui/comments';

const UserCard = ({ userId }) => {
    const [user, setUser] = useState();

    useEffect(() => {
        API.users.getById(userId).then((data) => setUser(data));
    }, []);
    if (user) {
        return (
            <div className="container">
                <div className="row gutters-sm">
                    <div className="col-md-4 mb-3">
                        <UserInfoCard user={user} />
                        <QualitiesCard data={user.qualities} />
                        <MeetingsCard value={user.completedMeetings} />
                    </div>
                    <div className="col-md-8">
                        <Comments />
                    </div>
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
