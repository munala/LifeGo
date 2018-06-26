import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import MyLists from '../../Common/components/Masonry';
import myListsActions from '../actions';

const mapStateToProps = ({
  data: { myData },
  profile,
  currentApiCalls: { myBucketlists: currentApiCalls },
}) => ({
  data: myData,
  profile,
  currentApiCalls,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    ...myListsActions,
  }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(MyLists);
