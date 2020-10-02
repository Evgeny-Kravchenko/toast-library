import { keyframes } from 'styled-components';

export default {
  slide: {
    appearance: keyframes`
      0% {
        transform: translateX(1000px);
        opacity: 0;
      }
      100% {
        transform: translateX(0);
        opacity: 1;
      }
    `,
    disappearance: keyframes`
      0% {
        transform: translateX(0);
        opacity: 1;
      }
      100% {
        transform: translateX(1000px);
        opacity: 0;
      }
    `,
  },
  swing: {
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
  },
  puff: {
    appearance: keyframes`
      0% {
        transform: scale(2);
        filter: blur(4px);
        opacity: 0;
      }
      100% {
        transform: scale(1);
        filter: blur(0px);
        opacity: 1;
      }
  `,
    disappearance: keyframes`
      0% {
        transform: scale(1);
        filter: blur(0px);
        opacity: 1;
      }
      100% {
        transform: scale(2);
        filter: blur(4px);
        opacity: 0;
      }
    `,
  },
};
