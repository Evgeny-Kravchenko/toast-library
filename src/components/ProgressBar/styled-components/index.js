import styled from 'styled-components';

const StyledProgressBar = styled.progress`
  width: 100%;
  height: 5px;
  margin-bottom: -1px;
  border-radius: 0 0 5px 5px;
  overflow: hidden;

  &::-webkit-progress-bar {
    border-radius: 0 0 5px 5px;
  }

  &::-webkit-progress-value {
    background: rgb(39, 145, 37);
    background: linear-gradient(
      90deg,
      rgba(39, 145, 37, 1) 0%,
      rgba(22, 121, 9, 1) 35%,
      rgba(0, 255, 16, 0.8799894957983193) 100%
    );
  }
`;

export default StyledProgressBar;
