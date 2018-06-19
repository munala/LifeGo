import React from 'react';
import { PropTypes } from 'prop-types';

export const renderSuggestion = (suggestion, getSuggestionItemProps) => (
  <div {...getSuggestionItemProps(suggestion, { className: 'suggestion' })}>
    <span>{suggestion.description}</span>
  </div>
);

renderSuggestion.propTypes = {
  formattedSuggestion: PropTypes.shape({
    mainText: PropTypes.string,
    secondaryText: PropTypes.string,
  }).isRequired,
  id: PropTypes.string.isRequired,
};

export const renderFooter = () => (
  <div className="location-footer">
    <div>
      <img
        src={require('../../../../../assets/images/powered_by_google_default.png')} // eslint-disable-line global-require
        className="location-footer-image"
        alt="location"
      />
    </div>
  </div>
);

export const setInputProps = ({ location, onChange }) => ({
  value: location,
  placeholder: 'type location',
});

export const cssClasses = {
  root: 'location',
  input: 'location-input',
  autocompleteContainer: 'location-drop-down',
};
