import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';

const styles = {
  root: {
    flexGrow: 1,
  },
};

const LinearIndeterminate = ({ classes }) => (
  <div className={classes.root}>
    <LinearProgress />
  </div>
);

LinearIndeterminate.propTypes = {
  classes: PropTypes.shape({}).isRequired,
};

export default withStyles(styles)(LinearIndeterminate);
