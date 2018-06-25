import React from 'react';
import PropTypes from 'prop-types';
import PlacesAutocomplete from 'react-places-autocomplete';

import { renderSuggestion } from './autoCompleteProps';
import '../styles.css';

const LocationField = ({
  bucketlist,
  onChange,
}) => (
  <PlacesAutocomplete
    value={bucketlist.location || ''}
    onChange={value => onChange({ value, type: 'location' })}
    onSelect={value => onChange({ value, type: 'location' })}
  >
    {({ getInputProps, suggestions, getSuggestionItemProps }) => (
      <div className="location-container">
        <input
          {...getInputProps({
            placeholder: 'type location',
            className: 'location-input',
          })}
        />
        <div className="location-drop-down">
          {suggestions.map(suggestion => renderSuggestion(suggestion, getSuggestionItemProps))}
        </div>
      </div>
    )}
  </PlacesAutocomplete>
);
LocationField.propTypes = {
  bucketlist: PropTypes.shape({}).isRequired,
  onChange: PropTypes.func.isRequired,
};

export default LocationField;
