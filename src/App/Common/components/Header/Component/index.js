import React from 'react';
import Popover from '@material-ui/core/Popover';
import Modal from '@material-ui/core/Modal';

import BaseClass from './BaseClass';
import Chat from '../../../../Chat/Container';
import Notifications from '../../../../Notifications/Container';
import UserAlerts from '../../../../UserAlerts/Container';
import HeaderLeft from '../HeaderLeft';
import HeaderRight from '../HeaderRight';
import propTypes from './propTypes';
import '../styles.css';

class Header extends BaseClass {
  state = {
    anchorEl: null,
    topAnchor: null,
    pathname: this.props.location.pathname,
    loggedIn: false, // eslint-disable-line react/no-unused-state
    profile: {}, // eslint-disable-line react/no-unused-state
    selectedPanel: '',
  };

  static getDerivedStateFromProps = ({
    location: { pathname },
    loggedIn,
    actions: {
      getProfile, getNotifications, getAlerts, getConversations,
    },
    profile,
    currentApiCalls,
  }, state) => {
    if (loggedIn && loggedIn !== state.loggedIn) {
      getProfile();
      getNotifications();
      getAlerts();
      getConversations();
    }

    return ({
      ...state,
      profile,
      pathname,
      loggedIn,
    });
  }

  renderPanels =() => {
    const { selectedPanel, topAnchor } = this.state;

    if (selectedPanel && selectedPanel !== 'conversations') {
      const onClose = () => this.selectPanel({
        event: { target: null },
        panel: selectedPanel,
      });

      const panels = {
        notifications: () => <Notifications onClose={onClose} />,
        alerts: () => <UserAlerts onClose={onClose} />,
      };

      const Panel = panels[selectedPanel];
      return (
        <Popover
          open={Boolean(topAnchor)}
          anchorEl={topAnchor}
          onClose={onClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
        >
          <Panel />
        </Popover>
      );
    }
    return false;
  }

  render() {
    const {
      menuIconClick,
      to,
      avatarUrl,
      classes,
      loggedIn,
      counts,
      history,
      profile: { pictureUrl },
    } = this.props;

    const { pathname, anchorEl, selectedPanel } = this.state;

    const titles = {
      '/': 'Home',
      '/home': 'Home',
      '/explore': 'Explore',
      '/mylists': 'My Lists',
      '/profile': 'Profile',
      '/settings': 'Settings',
    };

    const title = titles[pathname] || 'Home';

    return (
      <div className="header-container" >
        <HeaderLeft
          menuIconClick={menuIconClick}
          history={history}
          avatarUrl={avatarUrl}
          loggedIn={loggedIn}
          to={to}
          title={title}
          classes={classes}
          onChange={() => {}}
        />

        <HeaderRight
          loggedIn={loggedIn}
          counts={counts}
          classes={classes}
          pictureUrl={pictureUrl}
          anchorEl={anchorEl}
          history={history}
          handleClose={this.handleClose}
          handleClick={this.handleClick}
          logout={this.logout}
          selectPanel={this.selectPanel}
        />

        {this.renderPanels()}

        <Modal
          open={selectedPanel === 'conversations'}
          onClose={() => this.selectPanel({
            event: { target: null },
            panel: selectedPanel,
          })}
        >
          <Chat
            onClose={() => this.selectPanel({
              event: { target: null },
              panel: selectedPanel,
            })}
          />
        </Modal>
      </div>
    );
  }
}

Header.propTypes = propTypes;

export default Header;
