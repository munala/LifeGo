import React from 'react';
import PropTypes from 'prop-types';

import Avatar from '../Avatar';
import OutlinedButton from '../OutlinedButton';
import FlatButton from '../FlatButton';
import RaisedButton from '../RaisedButton';
import avatar from '../../../../assets/images/user.png';
import './styles.css';

const isFriend = ({ person, profile: { friends } }) => friends
  .some(friend => friend.id === person.id && person.id);

const UserThumbnail = ({
  profile,
  person,
  addFriend,
  removeFriend,
  deleteAlert,
  goToProfile,
  alert,
}) => {
  const isaFriend = isFriend({ profile, person });

  return (
    <div
      className="user-thumbnail"
      style={alert.read !== true ? { backgroundColor: '#f0f0f0' } : {}}
    >
      <Avatar
        style={{ display: 'flex', height: 60, width: 60 }}
        src={person.pictureUrl || avatar}
        onClick={goToProfile}
      />
      <div className="user-actions">
        <div
          className="user-alert-text"
          onClick={goToProfile}
        >
          <span className="username">{`${person.displayName} `}</span>
          <span className="alert-text">added you.</span>
        </div>
        <div className="user-alert-buttons">
          {
            isaFriend ?
              <OutlinedButton
                onClick={removeFriend}
                label="Remove"
              /> :
              <RaisedButton
                onClick={addFriend}
                label="Add"
              />
          }
          <FlatButton
            onClick={() => deleteAlert(alert)}
            style={{ color: 'grey', backgroundColor: '#eee' }}
            label="Ignore"
          />
        </div>
      </div>
    </div>
  );
};

UserThumbnail.propTypes = {
  profile: PropTypes.shape({
    id: PropTypes.number.isRequired,
    friends: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number.isRequired,
    })).isRequired,
  }).isRequired,
  alert: PropTypes.shape({
    id: PropTypes.number,
    read: PropTypes.bool,
    user: PropTypes.string,
    userPictureUrl: PropTypes.string,
  }).isRequired,
  person: PropTypes.shape({
    id: PropTypes.number.isRequired,
  }).isRequired,
  addFriend: PropTypes.func.isRequired,
  removeFriend: PropTypes.func.isRequired,
  deleteAlert: PropTypes.func.isRequired,
  goToProfile: PropTypes.func.isRequired,
};

export default UserThumbnail;
