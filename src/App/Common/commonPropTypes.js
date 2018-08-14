import PropTypes from 'prop-types';

export default {
  bucketlist: PropTypes.shape({
    name: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
  }),
  bucketlists: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
  })),
  data: PropTypes.shape({
    bucketlists: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,
      friends: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string.isRequired,
      })).isRequired,
    })).isRequired,
  }),
  profile: PropTypes.shape({
    id: PropTypes.string,
    displayName: PropTypes.string.isRequired,
  }),
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }),
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }),
};
