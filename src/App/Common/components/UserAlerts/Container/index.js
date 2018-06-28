import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';

import * as alertActions from '../actions';
import * as profileActions from '../../../../Profile/actions';
import UserAlerts from '../Component';

const mapStateToProps = ({
  profile,
  alerts,
  currentApiCalls: {
    alerts: currentApiCalls,
  },
}) => ({
  profile,
  alerts,
  currentApiCalls,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    ...alertActions,
    ...profileActions,
  }, dispatch),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(UserAlerts));
