import styled from 'styled-components';

export const ToastWrapper = styled.div`
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 400px;
  padding: 20px;
  background-color: ${(props) => props.backgroundColor || props.theme.backgroundColor};
  border-radius: 3%;
  color: ${(props) => props.theme.color};
  animation: ${(props) => props.animation} 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) both;

  @keyframes swing-in-top-fwd {
    0% {
      transform: rotateX(-100deg);
      transform-origin: top;
      opacity: 0;
    }
    100% {
      transform: rotateX(0deg);
      transform-origin: top;
      opacity: 1;
    }
  }
`;

export const ToastHeader = styled.header`
  display: flex;
  justify-content: space-between;
`;

export const Title = styled.h2`
  margin: 0 auto;
  text-align: center;
`;

export const CloseButton = styled.button`
  width: 30px;
  height: 30px;
  cursor: pointer;
  background-color: rgba(255, 255, 255, 0);
  border: 0;
  outline: 0;
  transition: 0.2s;

  svg {
    fill: ${(props) => props.theme.color};
  }

  &:hover {
    opacity: 0.5;
  }
`;

export const ToastBody = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  padding-top: 10px;
`;

export const ToastDescription = styled.p`
  margin: 0;
`;
