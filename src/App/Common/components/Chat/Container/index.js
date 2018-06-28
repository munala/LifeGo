/* eslint-disable global-require */
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as messageActions from '../actions';
import Conversations from '../Component';

const mapStateToProps = ({
  profile,
  conversations,
  currentApiCalls: { messages: currentApiCalls },
}, ownProps) => ({
  profile,
  conversations,
  currentApiCalls,
  ...ownProps,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    ...messageActions,
  }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Conversations);
