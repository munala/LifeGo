import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Icon from '@material-ui/core/Icon';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';

import SearchDropDown from '../../../../SearchResults/SearchDropDown';

import '../styles.css';

const HeaderLeft = ({
  menuIconClick,
  history,
  avatarUrl,
  loggedIn,
  to,
  title,
  classes,
  onChange,
  users,
  onSelect,
  searchText,
  viewAll,
}) => (
  <div className="left">
    <Icon
      onClick={menuIconClick}
      className="menu-icon"
    >
    menu
    </Icon>

    <div onClick={() => history.push('/')}>
      <img
        alt="logo"
        className="logo"
        src={avatarUrl}
      />
    </div>

    <div className={loggedIn ? 'vr' : 'vr-hidden'} />

    {
        loggedIn &&
        <Link to={to} className="header-title">{title}</Link>
      }

    <div className="search-input-container">
      <TextField
        id="search"
        className={classes.searchInput}
        onChange={onChange}
        placeholder="Search LifeGo"
        onKeyDown={(e) => {
          if (e.keyCode === 13) { viewAll(); }
       }}
        InputProps={{
          disableUnderline: true,
          style: { flex: 1 },
          startAdornment: (
            <InputAdornment position="start">
              <Icon onClick={menuIconClick} className="menu-icon">search</Icon>
            </InputAdornment>
          ),
        }}
      />
      {
        searchText &&
        <SearchDropDown
          users={users}
          onSelect={onSelect}
          searchText={searchText}
          viewAll={viewAll}
        />
      }
    </div>
  </div>
);

HeaderLeft.propTypes = {
  menuIconClick: PropTypes.func.isRequired,
  history: PropTypes.shape({}).isRequired,
  avatarUrl: PropTypes.string.isRequired,
  loggedIn: PropTypes.bool.isRequired,
  to: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  classes: PropTypes.shape({}).isRequired,
  onChange: PropTypes.func.isRequired,
  onSelect: PropTypes.func.isRequired,
  searchText: PropTypes.string.isRequired,
  viewAll: PropTypes.func.isRequired,
  users: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    displayName: PropTypes.string.isRequired,
  })).isRequired,
};

export default HeaderLeft;
