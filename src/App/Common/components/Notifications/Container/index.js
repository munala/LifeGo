import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';

import * as notificationActions from '../actions';
import Notifications from '../Component';

const mapStateToProps = ({
  profile,
  notifications,
  currentApiCalls: {
    notifications: currentApiCalls,
  },
}, ownProps) => ({
  profile,
  notifications,
  currentApiCalls,
  ...ownProps,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ ...notificationActions }, dispatch),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Notifications));
