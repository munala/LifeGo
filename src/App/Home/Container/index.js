import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Home from '../../Common/components/Masonry';
import homeActions from '../actions';


const mapStateToProps = ({
  data: { allData },
  currentApiCalls: { allBucketlists: currentApiCalls },
  profile,
}) => ({
  data: allData,
  profile,
  currentApiCalls,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    ...homeActions,
  }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
