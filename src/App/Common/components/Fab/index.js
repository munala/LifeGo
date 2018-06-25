import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';

const styles = theme => ({
  root: {
    position: 'absolute',
    bottom: 0,
    right: 0,
  },
  fab: {
    position: 'absolute',
    bottom: theme.spacing.unit * 2,
    right: theme.spacing.unit * 2,
  },
});

const FloatingActionButtonZoom = ({ classes, theme, onClick }) => {
  const fab = {
    color: 'primary',
    className: classes.fab,
    icon: <AddIcon />,
  };

  return (
    <div
      className={classes.root}
    >
      <Button
        variant="fab"
        className={fab.className}
        color={fab.color}
        onClick={onClick}
      >
        {fab.icon}
      </Button>
    </div>
  );
};


FloatingActionButtonZoom.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  theme: PropTypes.shape({}).isRequired,
  onClick: PropTypes.func.isRequired,
};

export default withStyles(styles, { withTheme: true })(FloatingActionButtonZoom);
