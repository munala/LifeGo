import React from 'react';
import PropTypes from 'prop-types';

import Avatar from '../Avatar';
import './styles.css';

const NotificationThumbnail = ({
  profile,
  person,
  goToBucketlist,
  markNotificationAsRead,
  notification,
}) => (
  <div
    className="notification-thumbnail"
    style={notification.read !== true ? { backgroundColor: '#f7f7f7' } : {}}
  >
    <Avatar
      style={{ display: 'flex', height: 40, width: 40 }}
      src={
          person.pictureUrl || require('../../../../assets/images/user.png') // eslint-disable-line global-require
        }
    />
    <div className="notification-actions">
      <div
        className="notification-text"
        onClick={goToBucketlist}
      >
        <span className="notification-username">{`${person.displayName} `}</span>
        <span className="notification-text-detail">{`${
          notification.type === 'comment' ?
          `commented '${notification.text}'` :
          'liked your bucketlist'}.`
        }
        </span>
      </div>
      {
        !notification.read &&
        <div
          className="mark-notification-as-read"
          onClick={markNotificationAsRead}
        >
        Mark as Read
        </div>
      }
    </div>
  </div>
);

NotificationThumbnail.propTypes = {
  profile: PropTypes.shape({
    id: PropTypes.number.isRequired,
    friends: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number.isRequired,
    })).isRequired,
  }).isRequired,
  notification: PropTypes.shape({
    id: PropTypes.number,
    read: PropTypes.bool,
    user: PropTypes.string,
    userPictureUrl: PropTypes.string,
  }).isRequired,
  person: PropTypes.shape({
    id: PropTypes.number.isRequired,
  }).isRequired,
  goToBucketlist: PropTypes.func.isRequired,
  markNotificationAsRead: PropTypes.func.isRequired,
};

export default NotificationThumbnail;
