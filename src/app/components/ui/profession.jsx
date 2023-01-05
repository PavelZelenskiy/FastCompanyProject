import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import {
    getProfessionById,
    getProfessionsLoadingStatus,
    loadProfessionsList
} from '../../store/professions';

const Profession = ({ id }) => {
    // console.log(id);
    const dispatch = useDispatch();
    const isLoading = useSelector(getProfessionsLoadingStatus());
    if (isLoading) return 'Loading...';
    const prof = useSelector(getProfessionById(id));
    useEffect(() => {
        dispatch(loadProfessionsList());
    }, []);

    return <p>{prof.name}</p>;
};

Profession.propTypes = {
    id: PropTypes.string
};

export default Profession;
