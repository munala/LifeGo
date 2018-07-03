import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as profileActions from '../actions';
import * as bucketlistActions from '../../Common/actions/bucketlistActions';
import Profile from '../Component';

const mapStateToProps = ({
  profile,
  otherProfile,
  currentApiCalls: {
    profile: currentApiCalls,
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

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
