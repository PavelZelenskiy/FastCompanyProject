import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import Qualiti from './qualitie';
import { useDispatch, useSelector } from 'react-redux';
import {
    getQualitiesByIds,
    getQualitiesLoadingStatus,
    loadQualitiesList
} from '../../../store/qualities';

const QualitiesList = ({ qualities }) => {
    const dispatch = useDispatch();
    const isLoading = useSelector(getQualitiesLoadingStatus());
    if (isLoading) return 'Loading...';
    const qualitiesList = useSelector(getQualitiesByIds(qualities));
    useEffect(() => {
        dispatch(loadQualitiesList());
    }, []);

    return (
        <>
            {qualitiesList.map((q) => (
                <Qualiti key={q._id} {...q} />
            ))}
        </>
    );
};

QualitiesList.propTypes = {
    qualities: PropTypes.array
};

export default QualitiesList;
