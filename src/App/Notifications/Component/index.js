import React, { Component } from 'react';
import PropTypes from 'prop-types';

import NotificationThumbnail from '../../Common/components/NotificationThumbnail';
import '../styles.css';

class Notifications extends Component {
  state = {
    notification: {},
  }

  goToBucketlist = async (notification) => {
    const { onClose, history: { push }, actions: { markNotificationAsRead } } = this.props;

    markNotificationAsRead(notification);

    onClose();

    push(`lists/${notification.bucketlistId}`);
  }

  markAllAsRead = () => {
    this.props.notifications.forEach((notification) => {
      if (!notification.read) {
        this.props.actions.markNotificationAsRead(notification);
      }
    });
  }

  hoverNotification = (notification) => {
    this.setState({
      notification: notification.id === this.state.notification.id ? {} : notification,
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
          hovered={this.state.notification.id === notification.id}
          hoverNotification={() => this.hoverNotification(notification)}
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
    id: PropTypes.string,
    displayName: PropTypes.string,
    pictureUrl: PropTypes.string,
    friends: PropTypes.arrayOf(PropTypes.shape({})),
  }).isRequired,
  notifications: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
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
