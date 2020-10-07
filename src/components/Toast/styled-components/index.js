import styled from 'styled-components';

export const ToastWrapper = styled.div`
  display: ${(props) => (props.position ? 'block' : 'none')};
  position: fixed;
  ${(props) => props.position.positionY}: ${(props) => props.indents.indentY}px;
  ${(props) => props.position.positionX}: ${(props) => props.indents.indentX}px;
  width: 400px;
  padding: 20px;
  background-color: ${(props) => props.backgroundColor};
  border-radius: 5px;
  color: ${(props) => props.color};
  animation: ${(props) => props.animation} 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) both;
  cursor: pointer;
`;

export const ToastHeader = styled.header`
  display: flex;
  justify-content: space-between;
`;

export const Title = styled.h2`
  margin: 0 auto;
  text-align: center;
  user-select: none;
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
    fill: ${(props) => props.color};
  }

  &:hover {
    opacity: 0.5;
  }
`;

export const ToastBody = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-wrap: wrap;
  width: 100%;
`;

export const ToastDescription = styled.p`
  margin: 0 20px;
  flex-grow: 1;
  text-align: justify;
  user-select: none;
`;
