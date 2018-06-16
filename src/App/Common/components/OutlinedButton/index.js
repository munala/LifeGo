import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';

import './styles.css';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
});

const OutlinedButton = ({
  label,
  classes,
  style,
  onClick,
  disabled,
}) => (
  <div className="container" >
    <Button
      className={classes.button}
      variant="outlined"
      color="primary"
      onClick={onClick}
      disabled={disabled}
      style={style}
    >
      {label}
    </Button>
  </div>
);

OutlinedButton.propTypes = {
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  style: PropTypes.shape({}),
  classes: PropTypes.shape({}).isRequired,
};

OutlinedButton.defaultProps = {
  disabled: false,
  style: undefined,
};

export default withStyles(styles)(OutlinedButton);
