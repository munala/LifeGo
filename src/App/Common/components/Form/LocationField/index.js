import React from 'react';
import PropTypes from 'prop-types';
import PlacesAutocomplete from 'react-places-autocomplete';

import { renderSuggestion, cssClasses } from './autoCompleteProps';
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
      <div className={cssClasses.root}>
        <input
          {...getInputProps({
            placeholder: 'type location',
            className: cssClasses.input,
          })}
        />
        <div className="autocomplete-dropdown-container">
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
