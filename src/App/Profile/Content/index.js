import React, { Component } from 'react';
import PropTypes from 'prop-types';

import MyLists from '../../MyLists/Container';
import ProfileThumbnail from '../../Common/components/ProfileThumbnail';
import '../styles.css';

class SideBar extends Component {
  goToProfile = async (user) => {
    const { history: { replace, push }, match: { params: { id } } } = this.props;
    if (id) {
      replace(`${user.id}`);
    } else {
      push(`profile/${user.id}`);
    }
    this.props.selectStat({ stat: 'lists' });
  }

  renderUsers = (selectedProfile) => {
    const {
      profile, actions: { addFriend, removeFriend }, stat,
    } = this.props;

    if (selectedProfile[stat].length === 0) {
      return <div className="no-stat">{`No ${stat}`}</div>;
    }

    return selectedProfile[stat].map(user => (
      <ProfileThumbnail
        key={user.id}
        user={user}
        profile={profile}
        addFriend={() => addFriend(user)}
        removeFriend={() => removeFriend(user)}
        goToProfile={() => this.goToProfile(user)}
      />
    ));
  }


  render() {
    const {
      stat,
      profile,
      otherProfile,
      match: { params: { id } },
      data: { bucketlists },
    } = this.props;

    const selectedProfile = id && otherProfile.id && otherProfile.id !== profile.id ?
      otherProfile :
      profile;

    return (
      <div className="side-container" >
        <div className="content-container" >
          {
            ['followers', 'friends'].includes(stat) &&
            <div className="profile-people">
              {this.renderUsers(selectedProfile)}
            </div>
          }
          {
            stat === 'lists' &&
            <div className="content-details">
              {
                bucketlists.length === 0 &&
                <div className="no-stat">{`No ${stat}`}</div>
              }
              <MyLists fromProfile />
            </div>
          }
        </div>
      </div>
    );
  }
}

SideBar.propTypes = {
  profile: PropTypes.shape({
    friends: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string.isRequired,
    })).isRequired,
  }).isRequired,
  data: PropTypes.shape({
    bucketlists: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string.isRequired,
    })).isRequired,
  }).isRequired,
  otherProfile: PropTypes.shape({}).isRequired,
  actions: PropTypes.shape({}).isRequired,
  match: PropTypes.shape({}).isRequired,
  stat: PropTypes.string.isRequired,
  selectStat: PropTypes.func.isRequired,
};

export default SideBar;
