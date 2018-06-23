import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';

import './styles.css';

const styles = theme => ({
  textField: {
    display: 'flex',
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
  menu: {
    width: 400,
  },
});

const TextInput = ({
  name,
  label,
  autoFocus,
  classes,
  style,
  value,
  onChange,
  rows,
  rowsMax,
  placeholder,
  disabled,
  multiline,
  error,
  disableUnderline,
  children,
  onKeyPress,
  select,
}) => (
  <div className="container-input" >
    <TextField
      name={name}
      type={name === 'password' ? 'password' : 'text'}
      label={label || name}
      select={select}
      className={classes.textField}
      autoFocus={autoFocus}
      placeholder={placeholder}
      value={value}
      rows={rows}
      multiline={multiline}
      rowsMax={rowsMax}
      onChange={onChange}
      disabled={disabled}
      error={error}
      InputProps={{ disableUnderline, style, onKeyPress }}
      style={style}
    >
      {children && children}
    </TextField>
  </div>
);

TextInput.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  value: PropTypes.string.isRequired,
  autoFocus: PropTypes.bool,
  placeholder: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  multiline: PropTypes.bool,
  style: PropTypes.shape({}),
  rows: PropTypes.number,
  rowsMax: PropTypes.number,
  classes: PropTypes.shape({}).isRequired,
  error: PropTypes.bool,
  disableUnderline: PropTypes.bool,
  children: PropTypes.arrayOf(PropTypes.element),
  onKeyPress: PropTypes.func,
  select: PropTypes.bool,
};

TextInput.defaultProps = {
  placeholder: undefined,
  label: undefined,
  autoFocus: false,
  disabled: false,
  multiline: false,
  style: undefined,
  rowsMax: undefined,
  rows: undefined,
  select: undefined,
  children: undefined,
  error: false,
  disableUnderline: false,
  onKeyPress: () => {},
};

export default withStyles(styles)(TextInput);
