import styled from "styled-components";

export const ToastWrapper = styled.div`
  display: ${(props) => (props.isShown ? 'block' : 'none')};
  width: 400px;
  padding: 20px;
  background-color: ${(props) => props.theme.backgroundColor};
  border-radius: 3%;
  color: ${(props) => props.theme.color};
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
  padding: 10px;
`;

export const ToastDescription = styled.p`
  margin: 0;
`;
