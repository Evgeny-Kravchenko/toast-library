import React, { useState } from 'react';
import styled from 'styled-components';

import { CloseButton } from 'src/components/Toast/styled-components';

const ErrorIndicatorWrapper = styled.div`
  display: flex;
  box-sizing: border-box;
  padding: 10px;
  justify-content: center;
  position: fixed;
  right: 10px;
  bottom: 10px;
  width: 300px;
  height: 100px;
  border: 1px solid #ff0000;
  border-radius: 5px;
  text-align: center;
`;

const ErrorDescription = styled.p`
  display: flex;
  align-items: center;
  margin: 10px 0;
`;

function ErrorIndicator() {
  const [isShown, setIsShown] = useState(true);
  return (
    isShown && (
      <ErrorIndicatorWrapper>
        <ErrorDescription>
          Something went wrong, but we have already started to fix it.
        </ErrorDescription>
        <CloseButton onClick={() => setIsShown(false)}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
            <path d="M284.3 256L506.1 34.1c7.8-7.8 7.8-20.5 0-28.3 -7.8-7.8-20.5-7.8-28.3 0L256 227.7 34.1 5.9c-7.8-7.8-20.5-7.8-28.3 0 -7.8 7.8-7.8 20.5 0 28.3l221.9 221.9L5.9 477.9c-7.8 7.8-7.8 20.5 0 28.3 3.9 3.9 9 5.9 14.1 5.9 5.1 0 10.2-2 14.1-5.9L256 284.3l221.9 221.9c3.9 3.9 9 5.9 14.1 5.9s10.2-2 14.1-5.9c7.8-7.8 7.8-20.5 0-28.3L284.3 256z" />
          </svg>
        </CloseButton>
      </ErrorIndicatorWrapper>
    )
  );
}

export default ErrorIndicator;
