// @flow
import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import SideMenu from './Common/components/SideMenu';
import Header from './Common/components/Header';
import './styles.css';

const BasicExample = () => (
  <Router>
    <div className="app-container">
      <Header
        avatarUrl={require('../assets/icons/icon.png')} // eslint-disable-line global-require
        title="Home"
        loggedIn
        counts={{
          userAlerts: {
            count: 1,
            icon: 'person',
            onClick: () => {},
          },
          messages: {
            count: 2,
            icon: 'message',
            onClick: () => {},
          },
          notifications: {
            count: 3,
            icon: 'notifications',
            onClick: () => {},
          },
        }}
        menuIconClick={() => {}}
        onChange={() => {}}
      />
      <div className="app-body">
        <SideMenu
          menuItems={{
            top: [
              {
                icon: 'home',
                text: 'Home',
                onClick: () => {},
              },
              {
                icon: 'explore',
                text: 'Discover',
                onClick: () => {},
              },
              {
                icon: 'list',
                text: 'My Lists',
                onClick: () => {},
              },
              {
                icon: 'account_circle',
                text: 'Profile',
                onClick: () => {},
              },
            ],
            bottom: [
              {
                text: 'Settings',
                onClick: () => {},
              },
            ],
          }}
          activeItem="home"
        />
        <div className="app-content" />
      </div>
    </div>
  </Router>
);

export default BasicExample;
