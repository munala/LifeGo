/* eslint-disable global-require */
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';

import * as messageActions from '../actions';
import { searchUsers } from '../../SearchResults/actions';
import Conversations from '../Component';

const mapStateToProps = ({
  profile,
  conversations,
  currentApiCalls: { messages: currentApiCalls },
  searchResults: { users },
}, ownProps) => ({
  profile,
  searchResults: users,
  conversations,
  currentApiCalls,
  ...ownProps,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    ...messageActions,
    searchUsers,
  }, dispatch),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Conversations));
