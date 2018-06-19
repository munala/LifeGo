import React from 'react';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';

import './styles.css';

const UserAvatar = ({
  src,
  name,
  style,
  onClick,
}) => (
  <div
    className="avatar-container"
    onClick={onClick}
  >
    <Avatar
      alt={name}
      src={src}
      style={style}
    />
  </div>
);

UserAvatar.propTypes = {
  src: PropTypes.string.isRequired,
  name: PropTypes.string,
  style: PropTypes.shape({}),
  onClick: PropTypes.func,
};

UserAvatar.defaultProps = {
  name: 'user avatar',
  style: undefined,
  onClick: () => {},
};

export default UserAvatar;
