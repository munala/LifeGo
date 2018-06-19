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
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
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
