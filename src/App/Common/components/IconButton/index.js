import React from 'react';
import PropTypes from 'prop-types';
import Icon from '@material-ui/core/Icon';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';

import './styles.css';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
});

const IconButton = ({
  name,
  classes,
  style,
  onClick,
  disabled,
}) => (
  <div className="container" >
    <Button
      className={classes.button}
      color="primary"
      onClick={onClick}
      disabled={disabled}
      style={style}
    >
      <Icon>{name}</Icon>
    </Button>
  </div>
);

IconButton.propTypes = {
  name: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  style: PropTypes.shape({}),
  classes: PropTypes.shape({}).isRequired,
};

IconButton.defaultProps = {
  disabled: false,
  style: undefined,
};

export default withStyles(styles)(IconButton);
