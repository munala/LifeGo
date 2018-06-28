import React from 'react';

import '../styles.css';

export default () => (
  <div className="chat-container" >
    <div className="chat-header" />
    <div className="chat-list">
      {[...Array(6)].map(i => (
        <div key={i} className="chat-user" />
      ))}
    </div>
  </div>
);
