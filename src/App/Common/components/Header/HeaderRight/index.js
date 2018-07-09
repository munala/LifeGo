import React from 'react';
import PropTypes from 'prop-types';
import Icon from '@material-ui/core/Icon';
import Badge from '@material-ui/core/Badge';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import Avatar from '../../Avatar';
import RaisedButton from '../../RaisedButton';
import avatar from '../../../../../assets/images/user.png';
import { otherStyles } from '../styles';
import '../styles.css';

const HeaderRight = ({
  loggedIn,
  counts,
  classes,
  selectPanel,
  pictureUrl,
  anchorEl,
  handleClose,
  handleClick,
  logout,
  history,
}) => {
  if (loggedIn) {
    return (
      <div className="right">
        <div className="right-icons">
          {
          Object.keys(counts).map(key => (
            <Badge
              key={key}
              className={classes.margin}
              badgeContent={counts[key].count}
              color={counts[key].count ? 'error' : 'secondary'}
              onClick={(event) => {
                selectPanel({
                  event,
                  panel: key,
                });
              }}
            >
              <Icon
                className="menu-icon"
              >
                {counts[key].icon}
              </Icon>
            </Badge>
          ))
        }
        </div>

        <Avatar
          src={pictureUrl || avatar}
          onClick={handleClick}
          style={otherStyles.avatar}
        />
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={logout}>
            <Icon
              className="menu-icon logout-icon"
            >
              exit_to_app
            </Icon>
            Logout
          </MenuItem>
        </Menu>
      </div>
    );
  }
  return (
    <RaisedButton
      label="sign in"
      style={otherStyles.signIn}
      onClick={() => history.push({
          pathname: '/login',
          state: { login: true },
        })}
    />
  );
};

HeaderRight.propTypes = {
  loggedIn: PropTypes.bool.isRequired,
  counts: PropTypes.shape({}).isRequired,
  classes: PropTypes.shape({}).isRequired,
  selectPanel: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired,
  handleClick: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  anchorEl: PropTypes.shape({}),
  pictureUrl: PropTypes.string,
};

HeaderRight.defaultProps = {
  anchorEl: null,
  pictureUrl: null,
};

export default HeaderRight;
