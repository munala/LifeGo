import PropTypes from 'prop-types';

export default {
  profile: PropTypes.shape({
    friends: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string.isRequired,
    })).isRequired,
  }).isRequired,
  otherProfile: PropTypes.shape({}).isRequired,
  currentApiCalls: PropTypes.number.isRequired,
  actions: PropTypes.shape({}).isRequired,
  match: PropTypes.shape({}).isRequired,
  selectStat: PropTypes.func.isRequired,
  editProfileMode: PropTypes.bool.isRequired,
  toggleProfileMode: PropTypes.func.isRequired,
};
