import React from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Auth from './Auth/Container';
import SideMenu from './Common/components/SideMenu/container';
import Header from './Common/components/Header/Container';
import Explore from './Explore/Container';
import Home from './Home/Container';
import Profile from './Profile/Container';
import SingleList from './SingleList/container';
import NotFound from './Common/components/NotFound';
import './styles.css';

const Routes = ({ loggedIn }) => (
  <Router>
    <div className="app-container">
      <Header
        avatarUrl={require('../assets/icons/icon.png')} // eslint-disable-line global-require
        to="/"
        menuIconClick={() => {}}
        onChange={() => {}}
      />
      <div className="app-body">
        <SideMenu
          activeItem="home"
        />
        <div className="app-content" >
          <Switch>
            <Route exact path="/" component={loggedIn ? Home : Explore} />
            <Route exact path="/home" component={Home} />
            <Route path="/lists/:id" component={SingleList} />
            <Route path="/login" component={Auth} />
            <Route path="/explore" component={Explore} />
            <Route exact path="/profile" component={Profile} />
            <Route path="/profile/:id" component={Profile} />
            <Route path="/settings" component={Settings} />
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

const Settings = () => (<div>Settings</div>);

export default Routes;
