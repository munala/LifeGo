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
        <div className="app-content">
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/topics">Topics</Link>
            </li>
          </ul>

          <hr />

          <Route
            exact
            path="/about"
            component={About}
          />
          <Route
            path="/"
            component={Home}
          />
          <Route path="/topics" component={Topics} />
        </div>
      </div>
    </div>
  </Router>
);

const Home = () => (
  <div>
    <h2>Home</h2>
  </div>
);

const About = () => (
  <div>
    <h2>About</h2>
  </div>
);

const Topics = ({ match }) => ( // eslint-disable-line
  <div>
    <h2>Topics</h2>
    <ul>
      <li>
        <Link to={`${match.url}/rendering`}>Rendering with React</Link>
      </li>
      <li>
        <Link to={`${match.url}/components`}>Components</Link>
      </li>
      <li>
        <Link to={`${match.url}/props-v-state`}>Props v. State</Link>
      </li>
    </ul>

    <Route path={`${match.url}/:topicId`} component={Topic} />
    <Route
      exact
      path={match.url}
      render={() => <h3>Please select a topic.</h3>}
    />
  </div>
);

const Topic = ({ match }) => ( // eslint-disable-line
  <div>
    <h3>{match.params.topicId}</h3>
  </div>
);

export default BasicExample;
