import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Icon from '@material-ui/core/Icon';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';

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

    <TextField
      id="search"
      className={classes.searchInput}
      onChange={onChange}
      placeholder="Search LifeGo"
      InputProps={{
      disableUnderline: true,
      startAdornment: (
        <InputAdornment position="start">
          <Icon onClick={menuIconClick} className="menu-icon">search</Icon>
        </InputAdornment>
      ),
    }}
    />
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
};

export default HeaderLeft;
