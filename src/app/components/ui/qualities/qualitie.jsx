import React from 'react';
import PropTypes from 'prop-types';
import { useQualities } from '../../../hooks/useQualities';

const Qualiti = ({ id }) => {
    const { getQuality } = useQualities();
    const { color, name } = getQuality(id);

    return <span className={'badge m-1 bg-' + color}>{name}</span>;
};

Qualiti.propTypes = {
    id: PropTypes.string.isRequired
};

export default Qualiti;
