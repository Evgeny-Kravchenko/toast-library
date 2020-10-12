import React from 'react';
import PropTypes from 'prop-types';
import StyledProgressBar from './styled-components';

function ProgressBar({ showingDuration }) {
  return <StyledProgressBar showingDuration={showingDuration} />;
}

ProgressBar.propTypes = {
  showingDuration: PropTypes.number.isRequired,
};

export default ProgressBar;
