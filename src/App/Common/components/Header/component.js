import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Icon from '@material-ui/core/Icon';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import Badge from '@material-ui/core/Badge';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import Avatar from '../Avatar';
import RaisedButton from '../RaisedButton';
import { otherStyles } from './styles';
import './styles.css';

class Header extends Component {
  state = {
    anchorEl: null,
    pathname: this.props.location.pathname,
  };

  static getDerivedStateFromProps = ({ location: { pathname } }, state) => ({
    ...state,
    pathname,
  })

  handleClick = (event) => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  }

  logout = () => {
    this.setState({ anchorEl: null });
    this.props.actions.logout();
    this.props.history.push({
      pathname: '/login',
      state: { login: true },
    });
  };

  render() {
    const {
      menuIconClick,
      to,
      avatarUrl,
      classes,
      loggedIn,
      counts,
      onChange,
      history,
      profile: { pictureUrl },
    } = this.props;

    const { pathname, anchorEl } = this.state;

    const titles = {
      '/': 'Home',
      '/home': 'Home',
      '/explore': 'Discover',
      '/mylists': 'My Lists',
      '/profile': 'Profile',
      '/settings': 'Settings',
    };

    const title = titles[pathname];

    return (
      <div className="header-container" >
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
              src={pictureUrl || require('../../../../assets/images/user.png')} // eslint-disable-line global-require
              onClick={this.handleClick}
              style={otherStyles.avatar}
            />
            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={this.handleClose}
            >
              <MenuItem onClick={this.logout}>
                <Icon
                  className="menu-icon logout-icon"
                >
                  exit_to_app
                </Icon>
                Logout
              </MenuItem>
            </Menu>
          </div> :
          <RaisedButton
            label="sign in"
            style={otherStyles.signIn}
            onClick={() => history.push({
              pathname: '/login',
              state: { login: true },
            })}
          />
      }
      </div>
    );
  }
}

Header.propTypes = {
  menuIconClick: PropTypes.func.isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  profile: PropTypes.shape({
    pictureUrl: PropTypes.string,
  }).isRequired,
  actions: PropTypes.shape({
    logout: PropTypes.func.isRequired,
  }).isRequired,
  to: PropTypes.string.isRequired,
  avatarUrl: PropTypes.string.isRequired,
  classes: PropTypes.shape({}).isRequired,
  loggedIn: PropTypes.bool.isRequired,
  counts: PropTypes.shape({}).isRequired,
  onChange: PropTypes.func.isRequired,
};

export default Header;
