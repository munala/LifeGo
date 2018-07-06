import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Icon from '@material-ui/core/Icon';

import './styles.css';

const SideMenu = ({
  menuItems: { top, bottom },
  activeItem,
  location: { pathname },
}) => {
  const path = pathname === '/home' ? '/' : pathname;
  return (
    <div className="side-menu-container" >
      <div className="side-menu-items">
        {top.map(item => (
          <Link className="side-menu-item" key={item.icon} to={item.to}>
            <Icon
              style={{ color: (item.to.pathname || item.to) === path ? '#00bcd4' : '#888' }}
            >
              {item.icon}
            </Icon>

            <div
              className="item-title"
              style={{ color: (item.to.pathname || item.to) === path ? '#00bcd4' : '#3F3F3F' }}
            >
              {item.text}
            </div>
          </Link>
      ))}

        <div className="divider" />

        {bottom.map(item => (
          <Link className="side-menu-item" key={item.text} to={item.to}>
            <div
              className="item-title-bottom"
              style={{ color: item.to === path ? '#00bcd4' : '#3F3F3F' }}
            >
              {item.text}
            </div>
          </Link>
      ))}
      </div>

      <div className="footer">© 2018 Oliver Munala</div>
    </div>
  );
};
SideMenu.propTypes = {
  menuItems: PropTypes.shape({
    top: PropTypes.arrayOf(PropTypes.shape({})),
    bottom: PropTypes.arrayOf(PropTypes.shape({})),
  }).isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
  activeItem: PropTypes.string.isRequired,
};

export default SideMenu;
