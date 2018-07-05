import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';

import SearchResults from '../Component';
import * as searchActions from '../actions';
import * as bucketlistActions from '../../Common/actions/bucketlistActions';
import * as likeActions from '../../Common/actions/likeActions';
import * as commentActions from '../../Common/actions/commentActions';
import * as profileActions from '../../Profile/actions';

const mapStateToProps = ({
  searchResults,
  currentApiCalls: { searchResults: currentApiCalls },
  profile,
}) => ({
  data: {
    ...searchResults,
    newBucketlists: [],
  },
  currentApiCalls,
  profile,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    ...searchActions,
    ...bucketlistActions,
    ...likeActions,
    ...commentActions,
    ...profileActions,
  }, dispatch),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SearchResults));
