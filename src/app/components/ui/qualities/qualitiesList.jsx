import React from 'react';
import PropTypes from 'prop-types';
import Qualiti from './qualitie';
import { useQualities } from '../../../hooks/useQualities';

const QualitiesList = ({ id }) => {
    const { isLoading, qualities } = useQualities();

    const userQualities = qualities.filter((q) => id.includes(q._id));

    if (!isLoading) {
        return (
            <>
                {userQualities.map((q) => (
                    <Qualiti key={q._id} {...q} />
                ))}
            </>
        );
    } else return 'Loading...';
};

QualitiesList.propTypes = {
    id: PropTypes.array
};

export default QualitiesList;
