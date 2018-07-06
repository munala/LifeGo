import React from 'react';
import PropTypes from 'prop-types';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';

import FlatButton from '../FlatButton';
import styles from './styles';

const SnackbarComponent = ({
  open,
  message: {
    content,
    success,
  },
  closeSnackBar,
  undo,
}) => (
  <Snackbar
    autoHideDuration={6000}
    open={open}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'center',
    }}
  >
    <SnackbarContent
      message={content}
      style={success ? {} : styles.error}
      action={[
        undo ?
          <FlatButton
            key="undo"
            label="undo"
            style={styles.warning}
            onClick={closeSnackBar}
          /> :
          <IconButton
            key="close"
            aria-label="Close"
            color="inherit"
            onClick={closeSnackBar}
          >
            <CloseIcon />
          </IconButton>,
      ]}
    />
  </Snackbar>
);

SnackbarComponent.propTypes = {
  open: PropTypes.bool.isRequired,
  message: PropTypes.shape({
    content: PropTypes.string.isRequired,
    success: PropTypes.bool.isRequired,
  }).isRequired,
  closeSnackBar: PropTypes.func.isRequired,
  undo: PropTypes.string,
};

SnackbarComponent.defaultProps = {
  undo: null,
};

export default SnackbarComponent;
