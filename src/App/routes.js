import React, { Component } from 'react';
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
import SearchResults from './SearchResults/Container';
import NotFound from './Common/components/NotFound';
import icon from '../assets/icons/icon.png';
import './styles.css';

const ProtectedRoute = ({
  loggedIn,
  props,
  Component: Comp,
}) => (
  loggedIn ?
    <Comp {...props} /> :
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

class Routes extends Component {
  state = {
    showMenu: false,
  }
  componentDidMount = () => {
    window.addEventListener('resize', this.updateDimensions);
    window.dispatchEvent(new Event('resize'));
  }

  updateDimensions = () => {
    this.setState({
      showMenu: window.outerWidth > 1024,
    });
  }

  toggleMenu = () => {
    this.setState({
      showMenu: !this.state.showMenu,
    });
  }

  render() {
    const { loggedIn } = this.props;
    const { showMenu } = this.state;

    return (
      <Router>
        <div className="app-container">
          <Header avatarUrl={icon} to="/" menuIconClick={this.toggleMenu} />
          <div className="app-body">
            {
              showMenu &&
              <SideMenu
                activeItem="home"
              />
            }
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
                <Route path="/search" component={props => <ProtectedRoute loggedIn={loggedIn} {...props} Component={SearchResults} />} />
                <Route component={NotFound} />
              </Switch>
            </div>
          </div>
        </div>
      </Router>
    );
  }
}

Routes.propTypes = {
  loggedIn: PropTypes.bool.isRequired,
};

export default connect(({ loggedIn }) => ({ loggedIn }))(Routes);
