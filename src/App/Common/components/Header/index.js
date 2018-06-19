import React from 'react';
import PropTypes from 'prop-types';
import Icon from '@material-ui/core/Icon';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import Badge from '@material-ui/core/Badge';
import { withStyles } from '@material-ui/core/styles';

import Avatar from '../Avatar';
import RaisedButton from '../RaisedButton';
import './styles.css';

const styles = theme => ({
  searchInput: {
    display: 'flex',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    color: '#676767',
    fontSize: 20,
    backgroundColor: '#E5E5E5',
    height: 48,
    maxWidth: 720,
    borderRadius: 4,
    paddingLeft: 12,
  },
  margin: {
    margin: theme.spacing.unit * 2,
    cursor: 'pointer',
  },
});

const otherStyles = {
  avatar: {
    marginLeft: 24,
    height: 48,
    width: 48,
    cursor: 'pointer',
  },
  signIn: {
    marginRight: 24,
  },
};

const Header = ({
  menuIconClick,
  title,
  avatarUrl,
  classes,
  loggedIn,
  counts,
  onChange,
}) => (
  <div className="header-container" >
    <div className="left">
      <Icon
        onClick={menuIconClick}
        className="menu-icon"
      >
        menu
      </Icon>

      <img
        alt="logo"
        className="logo"
        src={avatarUrl}
      />

      <div className="vr" />

      <div className="header-title">{title}</div>

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
    {
      loggedIn ?
        <div className="right">
          {
            Object.keys(counts).map(key => (
              <Badge
                key={key}
                className={classes.margin}
                badgeContent={counts[key].count}
                color={counts[key].count ? 'error' : 'secondary'}
              >
                <Icon
                  onClick={counts[key].onClick}
                  className="menu-icon"
                >
                  {counts[key].icon}
                </Icon>
              </Badge>
            ))
          }

          <Avatar
            src={require('../../../../assets/images/user.png')} // eslint-disable-line global-require
            onClick={() => {}}
            style={otherStyles.avatar}
          />
        </div> :
        <RaisedButton
          label="sign in"
          style={otherStyles.signIn}
        />
    }
  </div>
);

Header.propTypes = {
  menuIconClick: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  avatarUrl: PropTypes.string.isRequired,
  classes: PropTypes.shape({}).isRequired,
  loggedIn: PropTypes.bool.isRequired,
  counts: PropTypes.shape({}).isRequired,
  onChange: PropTypes.func.isRequired,
};

export default withStyles(styles)(Header);
