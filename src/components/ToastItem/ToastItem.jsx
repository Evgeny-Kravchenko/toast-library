import React, { useState, useRef, useEffect } from 'react';
import {
  CloseButton,
  Title,
  ToastBody,
  ToastDescription,
  ToastHeader,
  ToastWrapper,
} from './styled-components';
import ImageType from '../ImageType';
import ProgressBar from '../ProgressBar';

const ToastItem = (props) => {
  const { onAnimationEnd, onClose, defaultIndentX } = props;
  const {
    animation,
    color,
    backgroundColor,
    position,
    indents,
    isFade,
    title,
    description,
    type,
    id,
  } = props.toast;

  const { positionX } = position;

  const [opacity, setOpacity] = useState('1');
  const [isMouseButtonPressedDown, setIsMouseButtonPressedDown] = useState(false);
  const ref = useRef(null);

  const unsubscribeFromEvents = () => {
    document.removeEventListener('mouseup', onMouseUp);
    document.removeEventListener('mousemove', onMouseMove);
  };

  const isItNeededToHide = (x) => {
    if (x < 0 || x > window.innerWidth) {
      setOpacity(1);
      setIsMouseButtonPressedDown(false);
      onClose(id);
      unsubscribeFromEvents();
    }
  };

  const onMouseUp = () => {
    unsubscribeFromEvents();
    ref.current.style[positionX] = `${defaultIndentX}px`;
    setIsMouseButtonPressedDown(false);
    setOpacity('1');
  };

  const onMouseMove = (event) => {
    if (isMouseButtonPressedDown) {
      if (positionX === 'right') {
        ref.current.style[positionX] = `${
          window.innerWidth - event.pageX - ref.current.offsetWidth / 2
        }px`;
      } else {
        ref.current.style[positionX] = `${event.pageX - ref.current.offsetWidth / 2}px`;
      }
      isItNeededToHide(event.pageX);
    }
  };

  useEffect(() => {
    if (isMouseButtonPressedDown) {
      document.addEventListener('mouseup', onMouseUp);
      document.addEventListener('mousemove', onMouseMove);
    } else {
      ref.current.style[positionX] = `${defaultIndentX}px`;
    }
  }, [isMouseButtonPressedDown]);

  const onMouseDown = () => {
    setIsMouseButtonPressedDown(true);
    setOpacity('0.3 !important');
  };

  let currentAnimation = null;
  if (animation) {
    currentAnimation = !isFade ? animation.appearance : animation.disappearance;
  }

  return (
    <ToastWrapper
      opacity={opacity}
      color={color}
      animation={currentAnimation}
      backgroundColor={backgroundColor}
      position={position}
      indents={indents}
      onAnimationEnd={() => onAnimationEnd(id, isFade)}
      onMouseDown={onMouseDown}
      ref={ref}
    >
      <ToastHeader>
        <Title>{title}</Title>
        <CloseButton
          color={color}
          onClick={() => onClose(id)}
          onMouseDown={(event) => event.stopPropagation()}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
            <path d="M284.3 256L506.1 34.1c7.8-7.8 7.8-20.5 0-28.3 -7.8-7.8-20.5-7.8-28.3 0L256 227.7 34.1 5.9c-7.8-7.8-20.5-7.8-28.3 0 -7.8 7.8-7.8 20.5 0 28.3l221.9 221.9L5.9 477.9c-7.8 7.8-7.8 20.5 0 28.3 3.9 3.9 9 5.9 14.1 5.9 5.1 0 10.2-2 14.1-5.9L256 284.3l221.9 221.9c3.9 3.9 9 5.9 14.1 5.9s10.2-2 14.1-5.9c7.8-7.8 7.8-20.5 0-28.3L284.3 256z" />
          </svg>
        </CloseButton>
      </ToastHeader>
      <ToastBody>
        <ImageType color={color} type={type} />
        <ToastDescription>{description}</ToastDescription>
      </ToastBody>
      <ProgressBar />
    </ToastWrapper>
  );
};

export default ToastItem;
