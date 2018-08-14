import React from 'react';
import PropTypes from 'prop-types';

import Avatar from '../Avatar';
import avatar from '../../../../assets/images/user.png';
import { setTime } from '../../../../utils';
import styles from './styles';
import './styles.css';

const NotificationThumbnail = ({
  profile,
  person,
  goToBucketlist,
  markNotificationAsRead,
  notification,
  hoverNotification,
  hovered,
}) => {
  const timeData = setTime(notification);
  const { createdAt } = timeData;
  const { time } = timeData;

  return (
    <div
      className="notification-thumbnail"
      onMouseEnter={hoverNotification}
      onMouseLeave={hoverNotification}
      style={notification.read !== true ? styles.readBackground : {}}
    >
      <Avatar
        style={styles.notificationAvatar}
        src={person.pictureUrl || avatar}
      />
      <div className="notification-actions">
        <div
          className="notification-text"
          onClick={goToBucketlist}
        >
          <span className="notification-username">{`${person.displayName} `}</span>
          <span className="notification-text-detail">{`${
          notification.type === 'comment' ?
          `commented: ${notification.text}` :
          'liked your bucketlist'}.`
        }
          </span>
        </div>
        <div className="notification-bottom-row">
          <div className="notification-time">{`${createdAt}${time}`}</div>
          {
            !notification.read && hovered &&
            <div
              className="mark-notification-as-read"
              onClick={markNotificationAsRead}
            >
            Mark as Read
            </div>
          }
        </div>
      </div>
    </div>
  );
};

NotificationThumbnail.propTypes = {
  profile: PropTypes.shape({
    id: PropTypes.string.isRequired,
    friends: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string.isRequired,
    })).isRequired,
  }).isRequired,
  notification: PropTypes.shape({
    id: PropTypes.string,
    read: PropTypes.bool,
    user: PropTypes.string,
    userPictureUrl: PropTypes.string,
  }).isRequired,
  person: PropTypes.shape({
    id: PropTypes.string.isRequired,
  }).isRequired,
  goToBucketlist: PropTypes.func.isRequired,
  markNotificationAsRead: PropTypes.func.isRequired,
  hoverNotification: PropTypes.func.isRequired,
  hovered: PropTypes.bool.isRequired,
};

export default NotificationThumbnail;
