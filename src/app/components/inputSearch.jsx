import React from 'react';
import PropTypes from 'prop-types';

const InputSearch = ({ value, onChange }) => {
    return (
        <form>
            <div className="input-group mb-3">
                <input
                    type="text"
                    id="search"
                    value={value}
                    onChange={onChange}
                    className="form-control"
                    placeholder="Поиск по имени"
                />
            </div>
        </form>
    );
};

InputSearch.propTypes = {
    value: PropTypes.string,
    onChange: PropTypes.func
};

export default InputSearch;
