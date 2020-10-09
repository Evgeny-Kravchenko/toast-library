import React, { useRef, useLayoutEffect } from 'react';
import PropTypes from 'prop-types';
import StyledProgressBar from './styled-components';

function ProgressBar({ showingDuration }) {
  const ref = useRef();

  useLayoutEffect(() => {
    const time = (1000 / showingDuration) * 5;
    const animate = setInterval(() => {
      if (ref.current.value === 0) {
        clearInterval(animate);
      }
      ref.current.value -= (showingDuration * 4) / showingDuration;
    }, time);
    return () => {
      clearInterval(animate);
    };
  }, []);

  return <StyledProgressBar value={showingDuration} max={showingDuration} ref={ref} />;
}

ProgressBar.propTypes = {
  showingDuration: PropTypes.number.isRequired,
};

export default ProgressBar;
