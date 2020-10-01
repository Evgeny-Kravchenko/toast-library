import { keyframes } from 'styled-components';

export default {
  appearance: keyframes`
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
  `,
  disappearance: keyframes`
      0% {
        transform: rotateX(0deg);
        transform-origin: top;
        opacity: 1;
      }
      100% {
        transform: rotateX(-100deg);
        transform-origin: top;
        opacity: 0;
      }
  `,
};
