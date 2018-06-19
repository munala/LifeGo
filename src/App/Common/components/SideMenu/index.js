import React from 'react';
import PropTypes from 'prop-types';

import Icon from '@material-ui/core/Icon';
import './styles.css';

const Header = ({
  menuItems: { top, bottom },
  activeItem,
}) => (
  <div className="side-menu-container" >
    <div className="side-menu-items">
      {top.map(item => (
        <div className="side-menu-item" key={item.icon}>
          <Icon
            style={{ color: item.icon === activeItem ? '#00bcd4' : '#888' }}
          >
            {item.icon}
          </Icon>

          <div
            className="item-title"
            style={{ color: item.icon === activeItem ? '#00bcd4' : '#3F3F3F' }}
          >
            {item.text}
          </div>
        </div>
      ))}

      <div className="divider" />

      {bottom.map(item => (
        <div className="side-menu-item" key={item.text}>
          <div className="item-title-bottom" >{item.text}</div>
        </div>
      ))}
    </div>

    <div className="footer">Footer</div>
  </div>
);

Header.propTypes = {
  menuItems: PropTypes.shape({
    top: PropTypes.arrayOf(PropTypes.shape({})),
    bottom: PropTypes.arrayOf(PropTypes.shape({})),
  }).isRequired,
  activeItem: PropTypes.string.isRequired,
};

export default Header;
