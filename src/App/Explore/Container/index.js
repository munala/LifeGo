import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Explore from '../../Common/components/Masonry';
import exploreActions from '../actions';


const mapStateToProps = ({
  data: { exploreData },
  currentApiCalls: { explore: currentApiCalls },
  profile,
}) => ({
  data: exploreData,
  currentApiCalls,
  profile,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    ...exploreActions,
  }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Explore);
