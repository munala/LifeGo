import React from 'react';
import PropTypes from 'prop-types';

import Avatar from '../../Common/components/Avatar';
import avatar from '../../../assets/images/user.png';
import styles from '../styles';
import '../styles.css';

const SearchDropDwon = ({
  users,
  onSelect,
  searchText,
  viewAll,
}) => (
  <div className="search-dropdown-wrapper">
    <div className="search-dropdown-container">
      <div className="search-dropdown">
        {
          users.splice(0, 5).map(user => (
            <div
              key={user.id}
              className="search-dropdown-user"
              onClick={() => onSelect(user.id)}
            >
              <Avatar
                style={styles.searchAvatar}
                src={user.pictureUrl || avatar}
              />
              <div className="search-dropdown-display-name">{user.displayName}</div>
            </div>
          ))
        }
        <div
          className="search-view-all"
          onClick={viewAll}
        >
          View all results for {searchText}
        </div>
      </div>
    </div>
  </div>
);

SearchDropDwon.propTypes = {
  onSelect: PropTypes.func.isRequired,
  searchText: PropTypes.string.isRequired,
  viewAll: PropTypes.func.isRequired,
  users: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    displayName: PropTypes.string.isRequired,
  })).isRequired,
};

export default SearchDropDwon;
