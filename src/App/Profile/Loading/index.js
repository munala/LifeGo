import React from 'react';
import styles from '../styles';

const Loading = () => (
  <div className="profile-loading-indicator">
    <div className="profile-loading-item">
      <div className="profile-loading-image" />
      <div className="profile-loading-header">
        <div className="profile-loading-details">
          <div className="profile-loading-detail" style={styles.profileDetail} />
          <div className="profile-loading-detail" style={styles.profileDetailBottom} />
        </div>
      </div>
    </div>
  </div>
);


export default Loading;
