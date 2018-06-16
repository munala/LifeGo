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

const RaisedButton = ({
  label,
  classes,
  style,
  onClick,
  disabled,
}) => (
  <div className="container" >
    <Button
      className={classes.button}
      variant="contained"
      color="primary"
      onClick={onClick}
      disabled={disabled}
      style={style}
    >
      {label}
    </Button>
  </div>
);

RaisedButton.propTypes = {
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  style: PropTypes.shape({}),
  classes: PropTypes.shape({}).isRequired,
};

RaisedButton.defaultProps = {
  disabled: false,
  style: undefined,
};

export default withStyles(styles)(RaisedButton);
