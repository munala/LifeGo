import React from 'react';
import PropTypes from 'prop-types';
import { Redirect, Route } from 'react-router-dom';
import { connect } from 'react-redux';

const ProtectedRoute = ({
  loggedIn,
  component: Component,
  ...rest
}) => (
  <Route
    {...rest}
    component={loggedIn ? Component : () => (
      <Redirect
        to={{
          pathname: '/login',
          state: { login: true },
        }}
      />
    )}
  />
);

ProtectedRoute.propTypes = {
  loggedIn: PropTypes.bool.isRequired,
  path: PropTypes.string.isRequired,
  component: PropTypes.func.isRequired,
  exact: PropTypes.bool,
};

ProtectedRoute.defaultProps = {
  exact: false,
};

export default connect(({ loggedIn }) => ({ loggedIn }))(ProtectedRoute);
