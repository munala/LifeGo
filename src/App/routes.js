import React from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Auth from './Auth/Container';
import SideMenu from './Common/components/SideMenu/container';
import Header from './Common/components/Header/container';
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
          <Route exact path="/" component={loggedIn ? Home : Discover} />
          <Route exact path="/home" component={Home} />
          <Route path="/login" component={props => <Auth {...props} />} />
          <Route path="/explore" component={Discover} />
          <Route path="/mylists" component={MyLists} />
          <Route path="/profile" component={Profile} />
          <Route path="/settings" component={Settings} />
        </div>
      </div>
    </div>
  </Router>
);

Routes.propTypes = {
  loggedIn: PropTypes.bool.isRequired,
};

const Home = () => (<div>Home</div>);
const Discover = () => (<div>Discover</div>);
const MyLists = () => (<div>MyLists</div>);
const Profile = () => (<div>Profile</div>);
const Settings = () => (<div>Settings</div>);

export default Routes;
