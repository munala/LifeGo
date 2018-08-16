import React from 'react';
import PropTypes from 'prop-types';

import logo from '../../../../../assets/icons/icon.png';
import RaisedButton from '../../RaisedButton';

const EmptyState = ({ loggedIn, pathname, openModal }) => (
  <div className="empty-state-container">
    <img
      alt="logo"
      className="empty-logo"
      src={logo}
    />
    <div className="empty-bottom">
      <div className="empty-bottom">
        <span className="empty-state-text">No bucketlists to show</span>
        {
          loggedIn && pathname !== '/explore' &&
          <div>
            <span className="empty-state-text empty-state-text-small">Add bucketlists and they will show up here</span>
            <RaisedButton label="add bucketlist" onClick={openModal} />
          </div>
        }
        <br />
      </div>
    </div>
  </div>
);

EmptyState.propTypes = {
  loggedIn: PropTypes.bool.isRequired,
  pathname: PropTypes.string.isRequired,
  openModal: PropTypes.func.isRequired,
};

export default EmptyState;
