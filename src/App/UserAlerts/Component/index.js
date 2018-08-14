import React, { Component } from 'react';
import PropTypes from 'prop-types';

import UserThumbnail from '../../Common/components/UserThumbnail';
import '../styles.css';

class UserAlerts extends Component {
  goToProfile = async (alert) => {
    const { onClose, history: { push }, actions: { markAlertAsRead } } = this.props;

    markAlertAsRead(alert);

    onClose();

    push(`profile/${alert.userId}`);
  }

  markAllAsRead = () => {
    this.props.alerts.forEach((alert) => {
      if (!alert.read) {
        this.props.actions.markAlertAsRead(alert);
      }
    });
  }

  renderAlerts = () => {
    const {
      alerts, profile, actions: { addFriend, removeFriend, deleteAlert },
    } = this.props;

    return alerts.map((alert) => {
      const person = {
        id: alert.userId,
        displayName: alert.user,
        pictureUrl: alert.userPictureUrl,
      };

      return (
        <UserThumbnail
          key={alert.id}
          alert={alert}
          profile={profile}
          person={person}
          addFriend={() => addFriend(person)}
          removeFriend={() => removeFriend(person)}
          deleteAlert={() => deleteAlert(alert)}
          goToProfile={() => this.goToProfile(alert)}
        />
      );
    });
  }

  render() {
    if (this.props.alerts.length === 0) {
      return <div className="no-alerts">No alerts</div>;
    }
    return (
      <div className="user-alerts-container">
        <div className="top-alert-row">
          <div className="top-alert-row-left">User Alerts</div>
          <div className="top-alert-row-right" onClick={this.markAllAsRead}>Mark All as Read</div>
        </div>
        {this.renderAlerts()}
      </div>
    );
  }
}

UserAlerts.propTypes = {
  profile: PropTypes.shape({
    id: PropTypes.string,
    displayName: PropTypes.string,
    pictureUrl: PropTypes.string,
    friends: PropTypes.arrayOf(PropTypes.shape({})),
  }).isRequired,
  alerts: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    read: PropTypes.bool,
    user: PropTypes.string,
    userPictureUrl: PropTypes.string,
  })).isRequired,
  actions: PropTypes.shape({
    addFriend: PropTypes.func.isRequired,
    removeFriend: PropTypes.func.isRequired,
    markAlertAsRead: PropTypes.func.isRequired,
    deleteAlert: PropTypes.func.isRequired,
  }).isRequired,
};

export default UserAlerts;
