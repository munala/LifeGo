import React from 'react';

const Loading = () => (
  <div className="profile-loading-indicator">
    <div className="profile-loading-item">
      <div className="profile-loading-image" />
      <div className="profile-loading-header">
        <div className="profile-loading-details">
          <div className="profile-loading-detail" style={{ width: 200 }} />
          <div className="profile-loading-detail" style={{ width: 150 }} />
        </div>
      </div>
    </div>
  </div>
);


export default Loading;
