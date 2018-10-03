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
import ProtectedRoute from './ProtectedRoute';
import icon from '../assets/icons/icon.png';
import './styles.css';


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
      width: window.outerWidth,
    });
  }

  toggleMenu = () => {
    this.setState({
      showMenu: !this.state.showMenu,
    });
  }

  render() {
    const { loggedIn } = this.props;
    const { showMenu, width } = this.state;

    return (
      <Router>
        <div className="app-container">
          <Header avatarUrl={icon} to="/" menuIconClick={this.toggleMenu} />
          <div className="app-body">
            {
              showMenu &&
              <SideMenu
                activeItem="home"
                toggeSideMenu={width > 1024 ? () => {} : this.toggleMenu}
              />
            }
            <div className="app-content" >
              <Switch>
                <Route exact path="/" render={() => <Redirect from="/" to={loggedIn ? '/home' : '/explore'} />} />
                <Route path="/login" component={Auth} />
                <Route path="/explore" component={Explore} />
                <ProtectedRoute exact path="/home" component={Home} />
                <ProtectedRoute path="/lists/:id" component={SingleList} />
                <ProtectedRoute exact path="/profile" component={Profile} />
                <ProtectedRoute path="/profile/:id" component={Profile} />
                <ProtectedRoute path="/settings" component={Settings} />
                <ProtectedRoute path="/search" component={SearchResults} />
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
