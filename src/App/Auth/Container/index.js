import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import AuthComponent from '../Component';
import * as userActions from '../actions';


const mapStateToProps = ({
  loggedIn,
  error,
  message,
  currentApiCalls: { user: currentApiCalls },
}) => ({
  loggedIn,
  error,
  message,
  currentApiCalls,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    ...userActions,
  }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(AuthComponent);
