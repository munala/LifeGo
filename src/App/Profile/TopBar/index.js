/* eslint-disable jsx-a11y/label-has-for */
import React from 'react';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import BaseClass from './BaseClass';
import Avatar from '../../Common/components/Avatar';
import IconLabelButton from '../../Common/components/IconLabelButton';
import Loading from '../Loading';
import propTypes from './propTypes';
import avatar from '../../../assets/images/user.png';
import styles from '../styles';
import '../styles.css';

class TopBar extends BaseClass {
  state = {
    anchorEl: null,
  }

  renderProfileButtons = (selectedProfile) => {
    const {
      profile, editProfileMode, toggleProfileMode, actions: { removeFriend, addFriend },
    } = this.props;
    return (
      <div className="profile-buttons">
        {
          selectedProfile.id !== profile.id ?
            <div>
              {
                this.isFriend(selectedProfile) ?
                  <IconLabelButton
                    label="remove"
                    name="close"
                    style={styles.inActive}
                    onClick={() => removeFriend(selectedProfile)}
                  /> :
                  <IconLabelButton
                    label="add"
                    name="person_add"
                    style={styles.active}
                    onClick={() => addFriend(selectedProfile)}
                  />
              }
            </div> :
            <IconLabelButton
              label={editProfileMode ? 'change photo' : 'edit profile'}
              name={editProfileMode ? 'close' : 'edit'}
              editProfileMode={editProfileMode}
              onClick={
                editProfileMode ?
                this.openPhotoOptions :
                () => toggleProfileMode(!editProfileMode)
              }
              style={styles.active}
            />
        }
      </div>
    );
  }

  renderStats = (selectedProfile) => {
    const { stat, data } = this.props;

    return (
      <div className="profile-stats">
        <div
          className={`profile-stat${stat === 'lists' ? ' profile-stat-active' : ''}`}
          onClick={() => this.props.selectStat({ stat: 'lists' })}
        >
          <div className="profile-stat-label">{data.count}</div>
          <div className="profile-stat-value">Lists</div>
        </div>
        <div
          className={`profile-stat${stat === 'friends' ? ' profile-stat-active' : ''}`}
          onClick={() => this.props.selectStat({ stat: 'friends' })}
        >
          <div className="profile-stat-label">{selectedProfile.friends.length}</div>
          <div className="profile-stat-value">Friends</div>
        </div>
        <div
          className={`profile-stat${stat === 'followers' ? ' profile-stat-active' : ''}`}
          onClick={() => this.props.selectStat({ stat: 'followers' })}
        >
          <div className="profile-stat-label">{selectedProfile.followers.length}</div>
          <div className="profile-stat-value">Followers</div>
        </div>
      </div>
    );
  }

  render() {
    const {
      profile,
      otherProfile,
      currentApiCalls,
      editProfileMode,
      match: { params: { id } },
    } = this.props;

    const { anchorEl } = this.state;

    const selectedProfile = id && otherProfile.id && otherProfile.id !== profile.id ?
      otherProfile :
      profile;

    return currentApiCalls > 0 || !selectedProfile.id ?
      <Loading /> :
      <div className="side-bar-container" >
        <div className="profile-top-row">
          <div className="profile-avatar">
            <Avatar
              src={selectedProfile.pictureUrl || avatar}
              onClick={this.handleClick}
              style={styles.profileAvatar}
            />
          </div>
          <div className="profile-details">
            <div className="profile-display-name">{selectedProfile.displayName}</div>
            {
              selectedProfile.id === profile.id &&
              <div className="profile-email">{selectedProfile.email}</div>
            }
            {this.renderProfileButtons(selectedProfile)}
          </div>
        </div>
        { !editProfileMode && this.renderStats(selectedProfile) }
        <Menu
          id="long-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={() => this.openPhotoOptions({ currentTarget: null })}
          PaperProps={{ style: styles.menu }}
        >
          <MenuItem onClick={() => {}}>
            <label
              htmlFor="file-upload"
              className="avatar-input-label"
            >
              {profile.pictureUrl ? 'Change' : 'Add'}
            </label>
            <input
              id="file-upload"
              className="inputfile"
              type="file"
              onChange={this.changePhoto}
            />
          </MenuItem>
          {
            profile.pictureUrl &&
            <MenuItem onClick={this.removePhoto}>Remove</MenuItem>
          }
        </Menu>
      </div>;
  }
}

TopBar.propTypes = propTypes;

export default TopBar;
