import styled, { keyframes } from 'styled-components';

const loading = keyframes`
  0% {
    transform: translateX(0px);
  }
  100% {
    transform: translateX(-400px);
  }
`;

const StyledProgressBar = styled.div`
  width: 100%;
  height: 5px;
  background: rgb(39, 145, 37);
  background: linear-gradient(
    90deg,
    rgba(39, 145, 37, 1) 0%,
    rgba(22, 121, 9, 1) 35%,
    rgba(0, 255, 16, 0.8799894957983193) 100%
  );
  animation: ${loading} ${(props) => props.showingDuration - 100}ms linear 0s 1 forwards;
`;

export default StyledProgressBar;
