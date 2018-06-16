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
  rightIcon: {
    marginLeft: theme.spacing.unit,
  },
  iconSmall: {
    fontSize: 20,
  },
});

const IconLabelButton = ({
  label,
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
      variant="contained"
      onClick={onClick}
      disabled={disabled}
      style={style}
    >
      {label}
      <Icon
        color="action"
        className={classes.rightIcon}
      >{name}
      </Icon>
    </Button>
  </div>
);

IconLabelButton.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  style: PropTypes.shape({}),
  classes: PropTypes.shape({}).isRequired,
};

IconLabelButton.defaultProps = {
  disabled: false,
  style: undefined,
};

export default withStyles(styles)(IconLabelButton);
