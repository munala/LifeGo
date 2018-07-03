import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import { logout } from '../../../Auth/actions';

import SideMenu from './component';

const mapStateToProps = ({
  loggedIn,
  profile,
  ...state
}) => {
  const loggedOutMenuItems = {
    top: [
      {
        to: '/',
        icon: 'explore',
        text: 'Explore',
      },
      {
        to: '/login',
        icon: 'add',
        text: 'Join LifeGo',
      },

    ],
    bottom: [],
  };

  const loggedInMenuItems = {
    top: [
      {
        to: '/',
        icon: 'home',
        text: 'Home',
      },
      {
        to: '/explore',
        icon: 'explore',
        text: 'Explore',
      },
      {
        to: '/profile',
        icon: 'account_circle',
        text: 'Profile',
      },
    ],
    bottom: [
      {
        to: '/settings',
        text: 'Settings',
      },
    ],
  };

  const menuItems = loggedIn ? loggedInMenuItems : loggedOutMenuItems;

  return ({
    menuItems,
  });
};

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    logout,
  }, dispatch),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SideMenu));
