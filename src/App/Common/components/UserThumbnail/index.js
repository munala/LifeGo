import React from 'react';
import PropTypes from 'prop-types';

import Avatar from '../Avatar';
import OutlinedButton from '../OutlinedButton';
import RaisedButton from '../RaisedButton';
import './styles.css';

const isFriend = ({ person, profile }) => {
  const { friends } = profile;

  return friends.some(friend => friend.id === person.id && person.id);
};

const UserThumbnail = ({
  profile,
  person,
  addFriend,
  removeFriend,
  goToProfile,
}) => {
  const isaFriend = isFriend({ profile, person });
  return (
    <div className="user-thumbnail">
      <Avatar
        style={{ display: 'flex', height: 60, width: 60 }}
        src={
          person.pictureUrl || require('../../../../assets/images/user.png') // eslint-disable-line global-require
        }
      />
      <div className="user-actions">
        <a href="#" className="username" onClick={() => goToProfile(person)}>{person.displayName}</a>
        {
          isaFriend ?
            <RaisedButton
              onClick={() => addFriend(person)}
              label="Add"
            /> :
            <OutlinedButton
              onClick={() => removeFriend(person)}
              label="Remove"
            />
        }
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
  person: PropTypes.shape({
    id: PropTypes.number.isRequired,
  }).isRequired,
  addFriend: PropTypes.func.isRequired,
  removeFriend: PropTypes.func.isRequired,
  goToProfile: PropTypes.func.isRequired,
};

export default UserThumbnail;
