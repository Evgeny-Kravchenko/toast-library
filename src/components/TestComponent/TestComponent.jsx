import React, { useState } from 'react';
import propTypes from 'prop-types';

import ImageType from '../ImageType';
import {
  ToastWrapper,
  CloseButton,
  Title,
  ToastBody,
  ToastDescription,
  ToastHeader,
} from './styled-components';

const TestComponent = ({ theme, animations }) => {
  const [isShown, setIsShown] = useState(true);
  const currentAnimation = !isShown ? animations.disappearance : animations.appearance;
  return (
    <ToastWrapper theme={theme} isShown={isShown} animation={currentAnimation}>
      <ToastHeader>
        <Title>Test component!</Title>
        <CloseButton
          theme={theme}
          onClick={() => {
            setIsShown(false);
          }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
            <path d="M284.3 256L506.1 34.1c7.8-7.8 7.8-20.5 0-28.3 -7.8-7.8-20.5-7.8-28.3 0L256 227.7 34.1 5.9c-7.8-7.8-20.5-7.8-28.3 0 -7.8 7.8-7.8 20.5 0 28.3l221.9 221.9L5.9 477.9c-7.8 7.8-7.8 20.5 0 28.3 3.9 3.9 9 5.9 14.1 5.9 5.1 0 10.2-2 14.1-5.9L256 284.3l221.9 221.9c3.9 3.9 9 5.9 14.1 5.9s10.2-2 14.1-5.9c7.8-7.8 7.8-20.5 0-28.3L284.3 256z" />
          </svg>
        </CloseButton>
      </ToastHeader>
      <ToastBody>
        <ImageType theme={theme} />
        <ToastDescription>This is the test component to check how it works.</ToastDescription>
      </ToastBody>
    </ToastWrapper>
  );
};

TestComponent.propTypes = {
  theme: propTypes.shape({ backgrondColor: propTypes.string, color: propTypes.string }).isRequired,
  animations: propTypes.any,
};

export default TestComponent;
