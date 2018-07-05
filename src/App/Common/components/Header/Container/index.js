import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';

import Header from '../Component';
import { logout } from '../../../../Auth/actions';
import { getProfile } from '../../../../Profile/actions';
import { getNotifications } from '../../../../Notifications/actions';
import { getConversations } from '../../../../Chat/actions';
import { getAlerts } from '../../../../UserAlerts/actions';
import { searchUsers, clearSearch } from '../../../../SearchResults/actions';
import { styles } from '../styles';

const mapStateToProps = ({
  loggedIn,
  profile,
  searchResults: { users },
  currentApiCalls: { profile: currentApiCalls },
  ...state
}) => {
  let count = 0;

  const keys = ['conversations', 'notifications', 'alerts'];

  const counts = {
    alerts: {
      count: 1,
      icon: 'person',
    },
    conversations: {
      count: 2,
      icon: 'message',
    },
    notifications: {
      count: 3,
      icon: 'notifications',
    },
  };

  keys.forEach((key) => {
    if (key === 'conversations') {
      state[key].forEach((conversation) => {
        let unread = false;

        conversation.messages.forEach((message) => {
          if (!message.read && message.receiverId === profile.id) {
            unread = true;
          }
        });

        if (unread) { count += 1; }
      });
    } else {
      state[key].forEach((item) => {
        if (!item.read) {
          count += 1;
        }
      });
    }

    counts[key].count = count;
    count = 0;
  });

  return ({
    loggedIn,
    profile,
    counts,
    users,
    currentApiCalls,
  });
};

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    logout,
    getProfile,
    getNotifications,
    getConversations,
    getAlerts,
    searchUsers,
    clearSearch,
  }, dispatch),
});

export default withRouter(withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(Header)));
