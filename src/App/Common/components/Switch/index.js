import React from 'react';
import PropTypes from 'prop-types';
import Switch from '@material-ui/core/Switch';

import './styles.css';


const Toggle = ({
  checked,
  style,
  onChange,
  disabled,
}) => (
  <div className="container" >
    <Switch
      color="primary"
      onChange={onChange}
      checked={checked}
      disabled={disabled}
      style={style}
    />
  </div>
);

Toggle.propTypes = {
  checked: PropTypes.bool.isRequired,
  disabled: PropTypes.bool,
  style: PropTypes.shape({}),
  onChange: PropTypes.func,
};

Toggle.defaultProps = {
  disabled: false,
  style: undefined,
  onChange: () => {},
};

export default Toggle;
