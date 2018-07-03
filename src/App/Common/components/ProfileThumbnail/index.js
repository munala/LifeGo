import React from 'react';
import PropTypes from 'prop-types';

import Avatar from '../Avatar';
import OutlinedButton from '../OutlinedButton';
import RaisedButton from '../RaisedButton';
import avatar from '../../../../assets/images/user.png';
import './styles.css';

const isFriend = ({ user, profile: { friends } }) => friends
  .some(friend => friend.id === user.id);

const ProfileThumbnail = ({
  profile,
  user,
  addFriend,
  removeFriend,
  goToProfile,
}) => {
  const isaFriend = isFriend({ profile, user });

  return (
    <div
      className="profile-thumbnail"
    >
      <Avatar
        style={{ display: 'flex', height: 60, width: 60 }}
        src={user.pictureUrl || avatar}
        onClick={goToProfile}
      />
      <div className="profile-actions">
        <div
          className="profile-alert-text"
          onClick={goToProfile}
        >
          {user.displayName}
        </div>
        {
          profile.id !== user.id &&
          <div className="profile-alert-buttons">
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
          </div>
        }
      </div>
    </div>
  );
};

ProfileThumbnail.propTypes = {
  profile: PropTypes.shape({
    id: PropTypes.number.isRequired,
    friends: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number.isRequired,
    })).isRequired,
  }).isRequired,
  user: PropTypes.shape({
    id: PropTypes.number.isRequired,
  }).isRequired,
  addFriend: PropTypes.func.isRequired,
  removeFriend: PropTypes.func.isRequired,
  goToProfile: PropTypes.func.isRequired,
};

export default ProfileThumbnail;
