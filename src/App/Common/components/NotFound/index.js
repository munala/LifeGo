import React from 'react';
import DocumentTitle from 'react-document-title';

import './styles.css';

export default () => (
  <DocumentTitle title="Page Not Found">
    <div className="not-found-container">The requested page could not be found</div>
  </DocumentTitle>
);
