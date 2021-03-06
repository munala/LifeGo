import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';

import * as profileActions from '../actions';
import * as bucketlistActions from '../../Common/actions/bucketlistActions';
import Profile from '../Component';

const mapStateToProps = ({
  profile,
  otherProfile,
  currentApiCalls: {
    myBucketlists: currentApiCalls,
  },
  data: { myData: data },
}) => ({
  data,
  profile,
  otherProfile,
  currentApiCalls,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    ...profileActions,
    ...bucketlistActions,
  }, dispatch),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Profile));
