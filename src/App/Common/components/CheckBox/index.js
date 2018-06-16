import React from 'react';
import PropTypes from 'prop-types';
import Checkbox from '@material-ui/core/Checkbox';

import './styles.css';


const CheckBox = ({
  checked,
  style,
  onChange,
  disabled,
}) => (
  <div className="container" >
    <Checkbox
      color="primary"
      onChange={onChange}
      checked={checked}
      disabled={disabled}
      style={style}
    />
  </div>
);

CheckBox.propTypes = {
  checked: PropTypes.bool.isRequired,
  disabled: PropTypes.bool,
  style: PropTypes.shape({}),
  onChange: PropTypes.func,
};

CheckBox.defaultProps = {
  disabled: false,
  style: undefined,
  onChange: () => {},
};

export default CheckBox;
