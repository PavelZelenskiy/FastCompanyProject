import React from 'react';
import PropTypes from 'prop-types';

const GroupList = ({
    items,
    valuePoperty,
    contentProperty,
    onItemSelect,
    selectedItem
}) => {
    return (
        <ul className="list-group">
            {Array.isArray(items)
                ? items.map((item) => (
                      <li
                          key={item[valuePoperty]}
                          className={
                              'list-group-item' +
                              (item === selectedItem ? ' active' : '')
                          }
                          onClick={() => onItemSelect(item)}
                          role="button"
                      >
                          {item[contentProperty]}
                      </li>
                  ))
                : Object.keys(items).map((item) => (
                      <li
                          key={items[item][valuePoperty]}
                          className={
                              'list-group-item' +
                              (items[item] === selectedItem ? ' active' : '')
                          }
                          onClick={() => onItemSelect(items[item])}
                          role="button"
                      >
                          {items[item][contentProperty]}
                      </li>
                  ))}
        </ul>
    );
};

GroupList.defaultProps = {
    valuePoperty: '_id',
    contentProperty: 'name'
};

GroupList.propTypes = {
    items: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired,
    valuePoperty: PropTypes.string.isRequired,
    contentProperty: PropTypes.string.isRequired,
    onItemSelect: PropTypes.func,
    selectedItem: PropTypes.object
};

export default GroupList;
