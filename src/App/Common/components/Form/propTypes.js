import PropTypes from 'prop-types';

export default {
  bucketlist: PropTypes.shape({
    name: PropTypes.string,
    pictureUrl: PropTypes.string,
  }),
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  save: PropTypes.func.isRequired,
  profile: PropTypes.shape({}).isRequired,
};
