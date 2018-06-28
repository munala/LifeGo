import React, { Component } from 'react';
import PropTypes from 'prop-types';

import NotificationThumbnail from '../../NotificationThumbnail';
import '../styles.css';

class Notifications extends Component {
  goToBucketlist = async (notification) => {
    const { history: { push }, actions: { markNotificationAsRead } } = this.props;

    markNotificationAsRead(notification);

    push(`home/${notification.bucketlistId}`);
  }

  markAllAsRead = () => {
    this.props.notifications.forEach((notification) => {
      if (!notification.read) {
        this.props.actions.markNotificationAsRead(notification);
      }
    });
  }

  renderNotifications = () => {
    const {
      notifications, profile, actions: { markNotificationAsRead },
    } = this.props;

    return notifications.map((notification) => {
      const person = {
        id: notification.sourceUserId,
        displayName: notification.user,
        pictureUrl: notification.userPictureUrl,
      };

      return (
        <NotificationThumbnail
          key={notification.id}
          notification={notification}
          profile={profile}
          person={person}
          markNotificationAsRead={() => markNotificationAsRead(notification)}
          goToBucketlist={() => this.goToBucketlist(notification)}
        />
      );
    });
  }

  render() {
    if (this.props.notifications.length === 0) {
      return <div className="no-notifications">No notifications</div>;
    }
    return (
      <div className="notification-container">
        <div className="top-notification-row">
          <div className="top-notification-row-left">Notifications</div>
          <div className="top-notification-row-right" onClick={this.markAllAsRead}>Mark All as Read</div>
        </div>
        {this.renderNotifications()}
      </div>
    );
  }
}

Notifications.propTypes = {
  profile: PropTypes.shape({
    id: PropTypes.number,
    displayName: PropTypes.string,
    pictureUrl: PropTypes.string,
    friends: PropTypes.arrayOf(PropTypes.shape({})),
  }).isRequired,
  notifications: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    read: PropTypes.bool,
    user: PropTypes.string,
    userPictureUrl: PropTypes.string,
  })).isRequired,
  actions: PropTypes.shape({
    markNotificationAsRead: PropTypes.func.isRequired,
    deleteNotification: PropTypes.func.isRequired,
  }).isRequired,
};

export default Notifications;
