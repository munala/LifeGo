import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    alignSelf: 'stretch',
    flexDirection: 'column',
    alignItems: 'stretch',
    marginTop: 5,
  },
  textField: {
    display: 'flex',
    justifyContent: 'center',
    alignSelf: 'center',
    width: 'calc(100% - 40px)',
  },
});

const DatePicker = ({
  classes,
  label,
  defaultValue,
  onChange,
}) => (
  <form className={classes.container} noValidate>
    <TextField
      id="date"
      label={label}
      type="date"
      onChange={onChange}
      defaultValue={defaultValue}
      className={classes.textField}
      InputLabelProps={{
        shrink: true,
      }}
    />
  </form>
);

DatePicker.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  label: PropTypes.string.isRequired,
  defaultValue: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default withStyles(styles)(DatePicker);
