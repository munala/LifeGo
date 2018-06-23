import { PropTypes } from 'prop-types';

export default {
  actions: PropTypes.shape({
    login: PropTypes.func.isRequired,
    socialLogin: PropTypes.func.isRequired,
    register: PropTypes.func.isRequired,
    resetPassword: PropTypes.func.isRequired,
  }).isRequired,
  location: PropTypes.shape({
    state: PropTypes.shape({
      login: PropTypes.bool,
    }),
  }).isRequired,
};
