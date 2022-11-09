import React from 'react';
import PropTypes from 'prop-types';

const Qualiti = ({ color, name, _id }) => {
    return (
        <span className={'badge m-1 bg-' + color} key={_id}>
            {name}
        </span>
    );
};

Qualiti.propTypes = {
    color: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    _id: PropTypes.string.isRequired
};

export default Qualiti;
