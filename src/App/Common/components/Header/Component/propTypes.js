import PropTypes from 'prop-types';

export default {
  menuIconClick: PropTypes.func.isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  profile: PropTypes.shape({
    id: PropTypes.string,
    pictureUrl: PropTypes.string,
  }).isRequired,
  actions: PropTypes.shape({
    logout: PropTypes.func.isRequired,
    getProfile: PropTypes.func.isRequired,
    getNotifications: PropTypes.func.isRequired,
    getAlerts: PropTypes.func.isRequired,
    getConversations: PropTypes.func.isRequired,
  }).isRequired,
  to: PropTypes.string.isRequired,
  avatarUrl: PropTypes.string.isRequired,
  classes: PropTypes.shape({}).isRequired,
  loggedIn: PropTypes.bool.isRequired,
  counts: PropTypes.shape({}).isRequired,
};
