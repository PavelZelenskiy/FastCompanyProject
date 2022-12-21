import React from 'react';
import PropTypes from 'prop-types';
import Qualiti from './qualitie';
import { useQualities } from '../../../hooks/useQualities';

const QualitiesList = ({ qualities }) => {
    const { isLoading } = useQualities();

    if (!isLoading) {
        return (
            <>
                {qualities.map((q) => (
                    <Qualiti key={q} id={q} />
                ))}
            </>
        );
    } else return 'Loading...';
};

QualitiesList.propTypes = {
    qualities: PropTypes.array
};

export default QualitiesList;
