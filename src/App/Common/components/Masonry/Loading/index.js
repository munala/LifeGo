/* eslint-disable react/no-array-index-key */
import React from 'react';
import PropTypes from 'prop-types';

import styles from '../styles';

const Loading = ({ columnCount }) => (
  <div className="loading-indicator" style={{ columnCount }}>
    {[...Array(20)].map((item, index) => (
      <div key={index} className="loading-item">
        <div className="loading-header">
          <div className="loading-avatar" />
          <div className="loading-details">
            <div className="loading-detail" style={styles.loadingDetail} />
            <div className="loading-detail" style={styles.loadingDetailBottom} />
          </div>
        </div>
        <div className="loading-body-details">
          <div className="loading-body-detail" style={styles.loadingBodyDetail} />
          <div className="loading-body-detail" style={styles.loadingBodyDetailDetail} />
        </div>
        {
          index % Math.ceil(Math.random() * (7 - 4) + 4) === 0 &&
          <div className="loading-image" />
        }
      </div>
    ))}
  </div>
);

Loading.propTypes = {
  columnCount: PropTypes.number.isRequired,
};

export default Loading;
