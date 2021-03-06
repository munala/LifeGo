import React, { Component } from 'react';
import PropTypes from 'prop-types';

import TopBar from '../TopBar';
import Content from '../Content';
import EditProfile from '../EditProfile';
import '../styles.css';

class Profile extends Component {
  state = {
    stat: 'lists',
    editProfileMode: false,
  }

  static getDerivedStateFromProps = ({
    profile: { id: profileId },
    match: { params: { id } },
    actions: { loadOtherBucketlists, loadBucketlists, getOtherProfile },
  }, state) => {
    const userId = id || profileId;

    if (userId !== state.id) {
      loadOtherBucketlists(userId);
      getOtherProfile(userId);
      return ({
        ...state,
        id: userId,
      });
    }

    return state;
  }

  componentDidMount = async () => {
    const { match: { params: { id } } } = this.props;
    if (id) {
      this.props.actions.loadOtherBucketlists(id);

      const res = await this.props.actions.getOtherProfile(id);

      if (res.error === 'User not found') {
        this.props.history.push('/not_found');
      }
    } else {
      this.props.actions.loadBucketlists();
    }
  }

  selectStat = ({ stat }) => {
    this.setState({ stat });
  }

  toggleProfileMode = (editProfileMode) => {
    this.setState({
      editProfileMode,
    });
  }

  render() {
    const { stat, editProfileMode } = this.state;

    return (
      <div className="profile-container">
        <TopBar
          {...this.props}
          stat={stat}
          editProfileMode={editProfileMode}
          selectStat={this.selectStat}
          toggleProfileMode={this.toggleProfileMode}
        />
        {
          editProfileMode ?
            <EditProfile
              {...this.props}
              toggleProfileMode={this.toggleProfileMode}
            /> :
            <Content
              {...this.props}
              stat={stat}
              selectStat={this.selectStat}
            />
        }
      </div>
    );
  }
}

Profile.propTypes = {
  profile: PropTypes.shape({
    friends: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string.isRequired,
    })).isRequired,
  }).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  actions: PropTypes.shape({
    loadOtherBucketlists: PropTypes.func.isRequired,
    getOtherProfile: PropTypes.func.isRequired,
    loadBucketlists: PropTypes.func.isRequired,
  }).isRequired,
};

export default Profile;
