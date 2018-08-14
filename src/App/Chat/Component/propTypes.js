import PropTypes from 'prop-types';

export default {
  profile: PropTypes.shape({
    id: PropTypes.string,
    userid: PropTypes.string,
    username: PropTypes.string,
    displayName: PropTypes.string,
    email: PropTypes.string,
    pictureUrl: PropTypes.string,
    friends: PropTypes.arrayOf(PropTypes.shape({})),
    searchUsers: PropTypes.arrayOf(PropTypes.shape({})),
  }).isRequired,
  conversations: PropTypes.arrayOf(PropTypes.shape({
    username: PropTypes.string,
    displayName: PropTypes.string,
    email: PropTypes.string,
    pictureUrl: PropTypes.string,
  })).isRequired,
  actions: PropTypes.shape({
    sendMessage: PropTypes.func.isRequired,
    updateMessage: PropTypes.func.isRequired,
    deleteMessage: PropTypes.func.isRequired,
    markAsRead: PropTypes.func.isRequired,
    deleteConversation: PropTypes.func.isRequired,
    startConversation: PropTypes.func.isRequired,
    getConversations: PropTypes.func.isRequired,
  }).isRequired,
  onClose: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};
