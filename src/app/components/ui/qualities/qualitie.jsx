import React from 'react';
import PropTypes from 'prop-types';

const Qualiti = ({ _id, color, name }) => {
    return (
        <span className={'badge m-1 bg-' + color} key={_id}>
            {name}
        </span>
    );
};

Qualiti.propTypes = {
    _id: PropTypes.string.isRequired,
    color: PropTypes.string,
    name: PropTypes.string
};

export default Qualiti;
