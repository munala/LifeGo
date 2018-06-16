import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';

import './styles.css';

const styles = theme => ({
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
});

const TextInput = ({
  autoFocus,
  classes,
  style,
  value,
  onChange,
  rowsMax,
  placeholder,
  disabled,
  error,
  disableUnderline,
  Children,
}) => (
  <div className="container" >
    <TextField
      className={classes.textField}
      autoFocus={autoFocus}
      placeholder={placeholder}
      color="primary"
      value={value}
      rowsMax={rowsMax}
      onChange={onChange}
      disabled={disabled}
      error={error}
      disableUnderline={disableUnderline}
      style={style}
    >
      {Children && <Children />}
    </TextField>
  </div>
);

TextInput.propTypes = {
  value: PropTypes.string.isRequired,
  autoFocus: PropTypes.bool,
  placeholder: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  style: PropTypes.shape({}),
  rowsMax: PropTypes.number,
  classes: PropTypes.shape({}).isRequired,
  error: PropTypes.bool,
  disableUnderline: PropTypes.bool,
  Children: PropTypes.element,
};

TextInput.defaultProps = {
  placeholder: undefined,
  autoFocus: false,
  disabled: false,
  style: undefined,
  rowsMax: undefined,
  Children: undefined,
  error: false,
  disableUnderline: false,
};

export default withStyles(styles)(TextInput);
