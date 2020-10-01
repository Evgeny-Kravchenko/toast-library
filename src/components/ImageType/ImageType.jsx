import React from 'react';
import styled from 'styled-components';

const Image = styled.svg`
  fill: ${(props) => props.theme.color};
  width: 30px;
  height: 30px;
`;

const ImageType = ({ theme }) => {
  return (
    <Image xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" theme={theme}>
      <path d="M497.4 70c-7.5-7.5-19.8-7.6-27.3 0L238.6 300.8l-83.5-90.7c-7.2-7.8-19.4-8.3-27.3-1.1 -7.8 7.2-8.3 19.4-1.1 27.3l97.1 105.5c3.6 3.9 8.5 6.1 13.8 6.2 0.1 0 0.3 0 0.4 0 5.1 0 10-2 13.6-5.6L497.3 97.3C504.9 89.8 504.9 77.5 497.4 70z" />
      <path d="M492.7 236.7c-10.7 0-19.3 8.6-19.3 19.3 0 119.9-97.5 217.4-217.4 217.4 -119.9 0-217.4-97.5-217.4-217.4 0-119.9 97.5-217.4 217.4-217.4 10.7 0 19.3-8.6 19.3-19.3C275.3 8.6 266.7 0 256 0 114.8 0 0 114.8 0 256c0 141.2 114.8 256 256 256 141.2 0 256-114.8 256-256C512 245.3 503.4 236.7 492.7 236.7z" />
    </Image>
  );
};

export default ImageType;
