import React, { useState, useEffect, forwardRef } from 'react';
import PropTypes from 'prop-types';

import ImageType from 'src/components/ImageType';
import ProgressBar from 'src/components/ProgressBar';
import {
  CloseButton,
  Title,
  ToastBody,
  ToastDescription,
  ToastHeader,
  ToastWrapper,
} from './styled-components';

const ToastItem = forwardRef((props, ref) => {
  const { onHide, defaultIndentX, setIsFadeForOneToasts, toast } = props;
  const {
    animation,
    color,
    backgroundColor,
    position,
    indents,
    title,
    description,
    type,
    id,
    isFade,
    showingDuration,
  } = toast;
  const { positionX } = position;

  const [opacity, setOpacity] = useState('1');
  const [isMouseButtonPressedDown, setIsMouseButtonPressedDown] = useState(false);
  const [isAnimated, setIsAnimated] = useState(true);

  const onMouseDown = () => {
    if (!isAnimated) {
      setIsMouseButtonPressedDown(true);
      setOpacity('0.3 !important');
    }
  };

  const onMouseUp = () => {
    if (isMouseButtonPressedDown) {
      ref.current.style[positionX] = `${defaultIndentX}px`;
      setIsMouseButtonPressedDown(false);
      setOpacity('1');
    }
  };

  const unsubscribeFromEvents = () => {
    document.removeEventListener('mouseup', onMouseUp);
    document.removeEventListener('mousemove', onMouseMove);
  };

  const onClose = () => {
    unsubscribeFromEvents();
    setIsFadeForOneToasts(id, true);
  };

  const isItNeededToHide = (x) => {
    if (x < 0 || x > window.innerWidth) {
      setOpacity('1');
      setIsMouseButtonPressedDown(false);
      onClose(id);
    }
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

  const onAnimationStart = () => {
    setIsAnimated(true);
  };

  const onAnimationEnd = () => {
    setIsAnimated(false);
    if (isFade) {
      onHide(id);
    }
  };

  useEffect(() => {
    if (isMouseButtonPressedDown) {
      document.addEventListener('mouseup', onMouseUp);
      document.addEventListener('mousemove', onMouseMove);
    } else {
      ref.current.style[positionX] = `${defaultIndentX}px`;
    }
    return () => {
      unsubscribeFromEvents();
      document.removeEventListener('mousedown', onMouseDown);
    };
  }, [isMouseButtonPressedDown]);

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
      onAnimationStart={onAnimationStart}
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
      <ToastBody showingDuration={showingDuration}>
        <ImageType color={color} type={type} />
        <ToastDescription>{description}</ToastDescription>
      </ToastBody>
      {showingDuration && <ProgressBar showingDuration={showingDuration} />}
    </ToastWrapper>
  );
});

ToastItem.displayName = 'ToastItem';

ToastItem.propTypes = {
  onHide: PropTypes.func.isRequired,
  defaultIndentX: PropTypes.number.isRequired,
  setIsFadeForOneToasts: PropTypes.func.isRequired,
  toast: PropTypes.shape({
    animation: PropTypes.shape({
      appearance: PropTypes.instanceOf(Object).isRequired,
      disappearance: PropTypes.instanceOf(Object).isRequired,
    }),
    color: PropTypes.string.isRequired,
    backgroundColor: PropTypes.string.isRequired,
    position: PropTypes.shape({
      positionX: PropTypes.string.isRequired,
      positionY: PropTypes.string.isRequired,
    }),
    indents: PropTypes.shape({
      indentX: PropTypes.number.isRequired,
      indentY: PropTypes.number.isRequired,
    }),
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    isFade: PropTypes.bool.isRequired,
    showingDuration: PropTypes.number.isRequired,
  }).isRequired,
};

export default ToastItem;
