import React from 'react';
import PropTypes from 'prop-types';
import Qualiti from './qualitie';

const QualitiesList = ({ qualities }) => {
    return (
        <>
            {qualities.map((q) => (
                <Qualiti key={q._id} {...q} />
            ))}
        </>
    );
};

QualitiesList.propTypes = {
    qualities: PropTypes.array
};

export default QualitiesList;
