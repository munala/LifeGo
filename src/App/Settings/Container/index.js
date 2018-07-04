import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';

import * as userActions from '../actions';
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
  }, dispatch),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Settings));
