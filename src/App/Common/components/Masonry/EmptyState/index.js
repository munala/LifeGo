import React from 'react';

import logo from '../../../../../assets/icons/icon.png';

const EmptyState = () => (
  <div className="empty-state-container">
    <img
      alt="logo"
      className="empty-logo"
      src={logo}
    />
    <div className="empty-bottom">
      <div>
        <span className="empty-state-text">Looks like the buckets are empty.</span><br />
        <span className="empty-state-text"> Perfect time for you to fill them.</span><br />
        <span className="empty-state-text">Start by pressing </span>
        <i className="material-icons add-icon">add_circle</i>
        <span className="empty-state-text"> at the bottom right of your screen.</span>
      </div>
    </div>
  </div>
);

export default EmptyState;
