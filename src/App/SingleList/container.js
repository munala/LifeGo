import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';

import SingleList from './';
import * as bucketlistActions from '../Common/actions/bucketlistActions';
import * as likeActions from '../Common/actions/likeActions';
import * as commentActions from '../Common/actions/commentActions';


const mapStateToProps = ({
  data: { allData: { bucketlist } },
  currentApiCalls: { myBucketlists: currentApiCalls },
  error,
  profile,
}) => ({
  error,
  bucketlist,
  profile,
  currentApiCalls,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    ...bucketlistActions,
    ...likeActions,
    ...commentActions,
  }, dispatch),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SingleList));
