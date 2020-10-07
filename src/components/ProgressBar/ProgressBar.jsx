import React from 'react';
import { ProgressBarWrapper, StyledProgressBar } from './styled-components';

function ProgressBar() {
  return (
    <ProgressBarWrapper>
      <StyledProgressBar value="100" max="100" />
    </ProgressBarWrapper>
  );
}

export default ProgressBar;
