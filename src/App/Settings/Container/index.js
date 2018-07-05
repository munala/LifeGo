import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';

import * as userActions from '../actions';
import { logout } from '../../Auth/actions';
import Settings from '../Component';

const mapStateToProps = ({
  profile,
  currentApiCalls: {
    settings: currentApiCalls,
  },
}) => ({
  profile,
  currentApiCalls,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    ...userActions,
    logout,
  }, dispatch),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Settings));
