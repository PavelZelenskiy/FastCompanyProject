import React from 'react';
import PropTypes from 'prop-types';
import UserInfoCard from '../../ui/userInfoCard';
import QualitiesCard from '../../ui/qualitiesCard';
import MeetingsCard from '../../ui/meetingsCard';
import Comments from '../../ui/comments';
import { useSelector } from 'react-redux';
import { getUserById } from '../../../store/users';

const UserCard = ({ userId }) => {
    const user = useSelector(getUserById(userId));
    // console.log(user);
    if (user) {
        return (
            <div className="container">
                <div className="row gutters-sm">
                    <div className="col-md-4 mb-3">
                        <UserInfoCard user={user} />
                        <QualitiesCard data={user.qualities} />
                        <MeetingsCard value={user.complitedMeetings} />
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
