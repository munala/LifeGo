import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Home from '../../Common/components/Masonry';
import homeActions from '../actions';


const mapStateToProps = ({
  data: { allData },
  profile,
}) => ({
  data: allData,
  profile,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    ...homeActions,
  }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
