import React from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import Auth from './Auth/Container';
import SideMenu from './Common/components/SideMenu/container';
import Header from './Common/components/Header/Container';
import Explore from './Explore/Container';
import Home from './Home/Container';
import Profile from './Profile/Container';
import Settings from './Settings/Container';
import SingleList from './SingleList/container';
import NotFound from './Common/components/NotFound';
import icon from '../assets/icons/icon.png';
import './styles.css';

const ProtectedRoute = ({
  loggedIn,
  props,
  Component,
}) => (
  loggedIn ?
    <Component {...props} /> :
    <Redirect to={{
      pathname: '/login',
      state: { login: true },
    }}
    />
);

ProtectedRoute.propTypes = {
  loggedIn: PropTypes.bool.isRequired,
  Component: PropTypes.func.isRequired,
  props: PropTypes.shape({}),
};

ProtectedRoute.defaultProps = {
  props: {},
};

const Routes = ({ loggedIn }) => (
  <Router>
    <div className="app-container">
      <Header avatarUrl={icon} to="/" menuIconClick={() => {}} />
      <div className="app-body">
        <SideMenu
          activeItem="home"
        />
        <div className="app-content" >
          <Switch>
            <Route exact path="/" render={() => <Redirect from="/" to={loggedIn ? '/home' : '/explore'} />} />
            <Route path="/login" component={Auth} />
            <Route path="/explore" component={Explore} />
            <Route exact path="/home" component={props => <ProtectedRoute loggedIn={loggedIn} {...props} Component={Home} />} />
            <Route path="/lists/:id" component={props => <ProtectedRoute loggedIn={loggedIn} {...props} Component={SingleList} />} />
            <Route exact path="/profile" component={props => <ProtectedRoute loggedIn={loggedIn} {...props} Component={Profile} />} />
            <Route path="/profile/:id" component={props => <ProtectedRoute loggedIn={loggedIn} {...props} Component={Profile} />} />
            <Route path="/settings" component={props => <ProtectedRoute loggedIn={loggedIn} {...props} Component={Settings} />} />
            <Route component={NotFound} />
          </Switch>
        </div>
      </div>
    </div>
  </Router>
);

Routes.propTypes = {
  loggedIn: PropTypes.bool.isRequired,
};

export default connect(({ loggedIn }) => ({ loggedIn }))(Routes);
