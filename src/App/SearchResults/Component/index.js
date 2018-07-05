import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CircularProgress from '@material-ui/core/CircularProgress';

import ProfileThumbnail from '../../Common/components/ProfileThumbnail';
import Masonry from '../../Common/components/Masonry';
import '../styles.css';

class SearchResults extends Component {
  state = {
    mode: '',
    data: this.props.data,
    currentApiCalls: 0,
    searchText: '',
  }

  componentDidMount = () => {
    const {
      location: { search },
    } = this.props;
    const params = new URLSearchParams(search);
    const mode = params.get('mode') || 'People';
    this.setMode(mode);
  }

  componentDidUpdate = () => {
    const {
      location: { search },
    } = this.props;
    const params = new URLSearchParams(search);
    const mode = params.get('mode') || 'People';
    const searchText = params.get('q');
    if (searchText !== this.state.searchText) {
      this.setState({ searchText });
      this.setMode(mode);
    }
  }

  setMode = async (mode) => {
    this.setState({ mode });
    const {
      location: { search },
      actions: { searchUsers, searchBucketlists },
    } = this.props;
    const params = new URLSearchParams(search);
    const searchText = params.get('q');
    const actions = {
      People: searchUsers,
      Lists: name => searchBucketlists(null, null, name),
    };

    this.setState({ currentApiCalls: 1 });
    const data = await actions[mode](searchText);
    this.setState({
      currentApiCalls: 0,
      data: {
        ...this.state.data,
        ...data,
      },
    });
  }

  goToProfile = async (user) => {
    this.props.history.push(`/profile/${user.id}`);
  }

  renderOptions = () => {
    const { mode: modeOption } = this.state;

    const {
      location: { search },
    } = this.props;

    const params = new URLSearchParams(search);
    const paramOption = params.get('mode') || 'People';
    const mode = modeOption || paramOption;

    return ['People', 'Lists'].map(option => (
      <div
        key={option}
        className={mode === option ? 'option-active' : 'option-inactive'}
        onClick={() => this.setMode(option)}
      >
        {option}
      </div>
    ));
  }

  renderUsers = (users) => {
    const {
      profile, actions: { addFriend, removeFriend },
    } = this.props;

    const { currentApiCalls } = this.state;

    if (currentApiCalls > 0) {
      return (
        <div className="search-progress">
          <CircularProgress
            size={50}
            style={{ margin: 20 }}
          />
        </div>
      );
    }

    return users.map(user => (
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
      currentApiCalls,
      data: { users, bucketlists },
      mode: modeOption,
    } = this.state;
    const {
      profile,
      location: { search },
    } = this.props;

    const userResults = users.filter(user => user.id !== profile.id);

    const params = new URLSearchParams(search);
    const paramOption = params.get('mode') || 'People';
    const searchText = params.get('q');
    const mode = modeOption || paramOption;

    const showEmptyState = ((mode === 'People' && users.length === 0) ||
      (mode === 'Lists' && bucketlists.length === 0))
       && currentApiCalls === 0;


    return (
      <div className="search-results-container">
        <div className="search-text">{searchText || 'Type a name on the search bar to see results'}</div>
        <div className="search-options">{this.renderOptions()}</div>
        {
           showEmptyState ?
             <div className="no-results">
               No results for {searchText}
               <div className="no-results-description">
                 {
                   `The name you entered did not match any results.
                   You may have mistyped the name.`
                 }
               </div>
             </div> :
            (searchText &&
              (
                mode === 'People' ?
                  <div className="user-results">{this.renderUsers(userResults)}</div> :
                  <div className="list-results">
                    <Masonry
                      {...this.props}
                      data={this.state.data}
                      currentApiCalls={currentApiCalls}
                      fromProfile
                    />
                  </div>
              )
            )
        }
      </div>
    );
  }
}

SearchResults.propTypes = {
  data: PropTypes.shape({
    users: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
    bucketlists: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  }).isRequired,
  location: PropTypes.shape({}).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  profile: PropTypes.shape({}).isRequired,
  actions: PropTypes.shape({}).isRequired,
};

export default SearchResults;
